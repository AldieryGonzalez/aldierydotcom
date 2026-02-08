'use client';

import { useParentSize } from '@/hooks/useParentSize';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import GridRow from './molecules/grid-row';

type BackgroundGridProps = {
	blockWidth?: number;
	blockHeight?: number;
	onSelectionChange?: (count: number) => void;
	resetSignal?: number;
};

const BackgroundGrid = ({
	blockWidth = 80,
	blockHeight = 80,
	onSelectionChange,
	resetSignal = 0,
}: BackgroundGridProps) => {
	const [coordinatesArray, setCoordinatesArray] = useState<string[]>([]);
	const [gridArray, setGridArray] = useState<number[][]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	const [randomInc, setRandomInc] = useState<number>(0);
	const [won, setWon] = useState(false);
	const hue = useMotionValue(0);
	const ref = useRef<HTMLDivElement>(null);
	const [parentWidth, parentHeight] = useParentSize(ref, 2);
	const gridHeight = Math.ceil(parentHeight / blockHeight);
	const gridWidth = Math.ceil(parentWidth / blockWidth);
	const message = 'HELLO';
	const solved = selected.length === message.length;

	useEffect(() => {
		const controls = animate(hue, 1440, {
			repeat: Infinity,
			duration: 2,
			ease: 'linear',
		});
		return () => {
			controls.stop();
		};
	}, [hue]);

	useEffect(() => {
		if (!solved || won) return;

		setWon(true);
		const timeout = window.setTimeout(() => {
			setSelected([]);
			setRandomInc((prev) => prev + 1);
			setWon(false);
		}, 2400);

		return () => window.clearTimeout(timeout);
	}, [solved, won]);

	useEffect(() => {
		onSelectionChange?.(selected.length);
	}, [selected.length, onSelectionChange]);

	useEffect(() => {
		setWon(false);
		setSelected([]);
		setRandomInc((prev) => prev + 1);
	}, [resetSignal]);

	useMemo(() => {
		const grid = Array.from({ length: gridHeight }).map(() =>
			Array.from({ length: gridWidth }).map(() => 0),
		);
		setGridArray(grid);
		const uniqueCoordinates = new Set<string>();
		while (uniqueCoordinates.size < message.length && grid.length) {
			const randomRow = Math.floor(Math.random() * grid.length);
			const randomColumn = Math.floor(Math.random() * grid[0].length);
			const coordinate = `${randomRow}_${randomColumn}`;
			uniqueCoordinates.add(coordinate);
		}
		setCoordinatesArray(Array.from(uniqueCoordinates));
	}, [gridHeight, gridWidth, randomInc]);

	return (
		<motion.div className='absolute inset-0 flex overflow-hidden border-t-4 border-[var(--line)]' ref={ref}>
			<div>
				{gridArray.map((row, i) => (
					<GridRow
						key={i}
						row={row}
						i={i}
						hue={hue}
						blockWidth={blockWidth}
						blockHeight={blockHeight}
						coordinatesArray={coordinatesArray}
						message={message}
						selected={selected}
						won={won}
						setSelected={setSelected}
					/>
				))}
			</div>
			{won && (
				<motion.div
					initial={{ opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0 }}
					className='pointer-events-none absolute inset-0 z-30 grid place-items-center bg-black/35 p-4'>
					<div className='border-4 border-[var(--line)] bg-[var(--accent-2)] px-6 py-5 text-center text-black shadow-[10px_10px_0_var(--line)]'>
						<p className='text-xs font-bold uppercase tracking-[0.2em]'>
							Secret Unlocked
						</p>
						<h2 className='mt-2 text-4xl sm:text-6xl'>HELLO FOUND</h2>
						<p className='mt-2 text-xs font-bold uppercase tracking-[0.14em]'>
							Reshuffling the board...
						</p>
					</div>
				</motion.div>
			)}
			{selected.length > 0 && (
				<button
					onClick={() => setRandomInc((prev) => prev + 1)}
					className='brutal-button absolute bottom-4 right-4 z-20 grid h-11 w-11 place-items-center bg-[var(--accent)] p-0 text-black'
					aria-label='Shuffle grid'>
					<Shuffle className='h-5 w-5' />
				</button>
			)}
		</motion.div>
	);
};

export default BackgroundGrid;
