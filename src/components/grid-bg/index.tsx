'use client';

import { useParentSize } from '@/hooks/useParentSize';
import { animate, motion, useMotionValue } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import GridRow from './molecules/grid-row';

type CollapsePhase = 'idle' | 'collapsing' | 'collapsed';

type BackgroundGridProps = {
	blockWidth?: number;
	blockHeight?: number;
	onSelectionChange?: (count: number) => void;
	onSolved?: () => void;
	collapseSignal?: number;
	onCollapseComplete?: () => void;
	resetSignal?: number;
};

const COLLAPSE_MS = 900;

const BackgroundGrid = ({
	blockWidth = 80,
	blockHeight = 80,
	onSelectionChange,
	onSolved,
	collapseSignal = 0,
	onCollapseComplete,
	resetSignal = 0,
}: BackgroundGridProps) => {
	const [coordinatesArray, setCoordinatesArray] = useState<string[]>([]);
	const [gridArray, setGridArray] = useState<number[][]>([]);
	const [selected, setSelected] = useState<number[]>([]);
	const [randomInc, setRandomInc] = useState<number>(0);
	const [won, setWon] = useState(false);
	const [collapsePhase, setCollapsePhase] = useState<CollapsePhase>('idle');
	const solvedHandled = useRef(false);
	const hue = useMotionValue(0);
	const ref = useRef<HTMLDivElement>(null);
	const [parentWidth, parentHeight] = useParentSize(ref, 0);
	const gridWidth = Math.max(1, Math.floor(parentWidth / blockWidth));
	const gridHeight = Math.max(1, Math.floor(parentHeight / blockHeight));
	const resolvedBlockWidth = parentWidth > 0 ? parentWidth / gridWidth : blockWidth;
	const resolvedBlockHeight = parentHeight > 0 ? parentHeight / gridHeight : blockHeight;
	const message = 'HELLO';
	const messageLength = Math.min(message.length, gridWidth * gridHeight);
	const visibleMessage = message.slice(0, messageLength);
	const solved = visibleMessage.length > 0 && selected.length === visibleMessage.length;

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
		onSelectionChange?.(selected.length);
	}, [selected.length, onSelectionChange]);

	useEffect(() => {
		if (!solved || solvedHandled.current) return;

		solvedHandled.current = true;
		setWon(true);
		onSolved?.();
	}, [onSolved, solved]);

	useEffect(() => {
		if (!collapseSignal || collapsePhase !== 'idle') return;
		setCollapsePhase('collapsing');

		const timeout = window.setTimeout(() => {
			setCollapsePhase('collapsed');
			onCollapseComplete?.();
		}, COLLAPSE_MS);

		return () => window.clearTimeout(timeout);
	}, [collapsePhase, collapseSignal, onCollapseComplete]);

	useEffect(() => {
		solvedHandled.current = false;
		setWon(false);
		setCollapsePhase('idle');
		setSelected([]);
		setRandomInc((prev) => prev + 1);
	}, [resetSignal]);

	useEffect(() => {
		const grid = Array.from({ length: gridHeight }).map(() =>
			Array.from({ length: gridWidth }).map(() => 0),
		);
		setGridArray(grid);
		const uniqueCoordinates = new Set<string>();
		while (
			uniqueCoordinates.size < visibleMessage.length &&
			gridHeight > 0 &&
			gridWidth > 0
		) {
			const randomRow = Math.floor(Math.random() * grid.length);
			const randomColumn = Math.floor(Math.random() * grid[0].length);
			const coordinate = `${randomRow}_${randomColumn}`;
			uniqueCoordinates.add(coordinate);
		}
		setCoordinatesArray(Array.from(uniqueCoordinates));
	}, [gridHeight, gridWidth, randomInc, visibleMessage.length]);

	return (
		<motion.div
			className='absolute inset-0 overflow-hidden border-t-4 border-[var(--line)]'
			ref={ref}>
			<div className='h-full w-full'>
				{gridArray.map((row, i) => (
					<GridRow
						key={i}
						row={row}
						i={i}
						hue={hue}
						blockWidth={resolvedBlockWidth}
						blockHeight={resolvedBlockHeight}
						coordinatesArray={coordinatesArray}
						message={visibleMessage}
						selected={selected}
						won={won}
						collapsePhase={collapsePhase}
						setSelected={setSelected}
					/>
				))}
			</div>
			{selected.length > 0 && collapsePhase === 'idle' && (
				<button
					onClick={() => {
						solvedHandled.current = false;
						setWon(false);
						setSelected([]);
						setRandomInc((prev) => prev + 1);
					}}
					className='brutal-button absolute bottom-4 right-4 z-20 grid h-11 w-11 place-items-center bg-[var(--accent)] p-0 text-black'
					aria-label='Shuffle grid'>
					<Shuffle className='h-5 w-5' />
				</button>
			)}
		</motion.div>
	);
};

export default BackgroundGrid;
