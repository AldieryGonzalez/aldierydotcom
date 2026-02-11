'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '@/types/games';

type Cell = { x: number; y: number };

type Direction = {
	x: number;
	y: number;
};

const GRID_SIZE = 16;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

function randomCell(excluded: Cell[]): Cell {
	for (;;) {
		const next = {
			x: Math.floor(Math.random() * GRID_SIZE),
			y: Math.floor(Math.random() * GRID_SIZE),
		};
		if (!excluded.some((cell) => cell.x === next.x && cell.y === next.y)) {
			return next;
		}
	}
}

function sameCell(a: Cell, b: Cell) {
	return a.x === b.x && a.y === b.y;
}

const SnakeGame = ({ isFullscreen }: GameProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frameRef = useRef<number>();
	const elapsedRef = useRef(0);
	const lastFrameRef = useRef(0);
	const scoreRef = useRef(0);
	const directionRef = useRef<Direction>({ x: 1, y: 0 });
	const queuedDirectionRef = useRef<Direction>({ x: 1, y: 0 });
	const snakeRef = useRef<Cell[]>([
		{ x: 8, y: 8 },
		{ x: 7, y: 8 },
		{ x: 6, y: 8 },
	]);
	const foodRef = useRef<Cell>({ x: 12, y: 6 });
	const runningRef = useRef(true);

	const [score, setScore] = useState(0);
	const [running, setRunning] = useState(true);

	const updateDirection = (next: Direction) => {
		const current = queuedDirectionRef.current;
		if (next.x === -current.x && next.y === -current.y) return;
		queuedDirectionRef.current = next;
	};

	const restart = () => {
		snakeRef.current = [
			{ x: 8, y: 8 },
			{ x: 7, y: 8 },
			{ x: 6, y: 8 },
		];
		foodRef.current = { x: 12, y: 6 };
		directionRef.current = { x: 1, y: 0 };
		queuedDirectionRef.current = { x: 1, y: 0 };
		scoreRef.current = 0;
		runningRef.current = true;
		setScore(0);
		setRunning(true);
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp') updateDirection({ x: 0, y: -1 });
			if (event.key === 'ArrowDown') updateDirection({ x: 0, y: 1 });
			if (event.key === 'ArrowLeft') updateDirection({ x: -1, y: 0 });
			if (event.key === 'ArrowRight') updateDirection({ x: 1, y: 0 });
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		const draw = () => {
			context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
			context.fillStyle = '#f4f0e4';
			context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

			context.strokeStyle = 'rgba(11,11,11,0.12)';
			for (let i = 0; i <= GRID_SIZE; i += 1) {
				const line = i * CELL_SIZE;
				context.beginPath();
				context.moveTo(line, 0);
				context.lineTo(line, CANVAS_SIZE);
				context.stroke();
				context.beginPath();
				context.moveTo(0, line);
				context.lineTo(CANVAS_SIZE, line);
				context.stroke();
			}

			const snake = snakeRef.current;
			snake.forEach((part, index) => {
				context.fillStyle = index === 0 ? '#ff4d00' : '#4d8dff';
				context.fillRect(part.x * CELL_SIZE + 1, part.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
			});

			const food = foodRef.current;
			context.fillStyle = '#000';
			context.fillRect(food.x * CELL_SIZE + 3, food.y * CELL_SIZE + 3, CELL_SIZE - 6, CELL_SIZE - 6);
		};

		const step = () => {
			if (!runningRef.current) return;

			directionRef.current = queuedDirectionRef.current;
			const direction = directionRef.current;
			const snake = snakeRef.current;
			const head = snake[0];
			const nextHead = {
				x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
				y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
			};

			if (snake.some((part) => sameCell(part, nextHead))) {
				runningRef.current = false;
				setRunning(false);
				return;
			}

			const ateFood = sameCell(nextHead, foodRef.current);
			const nextSnake = [nextHead, ...snake];
			if (!ateFood) {
				nextSnake.pop();
			} else {
				scoreRef.current += 1;
				setScore(scoreRef.current);
				foodRef.current = randomCell(nextSnake);
			}
			snakeRef.current = nextSnake;
		};

		const loop = (timestamp: number) => {
			if (!lastFrameRef.current) lastFrameRef.current = timestamp;
			const delta = timestamp - lastFrameRef.current;
			lastFrameRef.current = timestamp;
			elapsedRef.current += delta;

			const stepMs = Math.max(70, 130 - scoreRef.current * 3);
			while (elapsedRef.current >= stepMs) {
				step();
				elapsedRef.current -= stepMs;
			}

			draw();
			frameRef.current = window.requestAnimationFrame(loop);
		};

		frameRef.current = window.requestAnimationFrame(loop);
		return () => {
			if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
		};
	}, []);

	return (
		<section className='h-full w-full p-3 text-[var(--ink)]' aria-labelledby='snake-title'>
			<div className='mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em]'>
				<h3 id='snake-title'>Snake</h3>
				<p aria-live='polite'>Score: {score}</p>
			</div>
			<p id='snake-help' className='mb-2 text-[11px] font-semibold uppercase tracking-[0.1em]'>
				Use arrow keys or buttons to steer.
			</p>
			<canvas
				ref={canvasRef}
				width={CANVAS_SIZE}
				height={CANVAS_SIZE}
				className={`block w-full border-4 border-[var(--line)] bg-[var(--paper)] ${isFullscreen ? 'max-w-[760px]' : 'max-w-[360px]'}`}
				role='img'
				aria-label='Snake game board'
				aria-describedby='snake-help'
			/>
			<div className='mt-3 flex flex-wrap items-center gap-2'>
				<button className='brutal-button px-2 py-1 text-xs' onClick={() => updateDirection({ x: 0, y: -1 })} aria-label='Move snake up'>
					Up
				</button>
				<button className='brutal-button px-2 py-1 text-xs' onClick={() => updateDirection({ x: -1, y: 0 })} aria-label='Move snake left'>
					Left
				</button>
				<button className='brutal-button px-2 py-1 text-xs' onClick={() => updateDirection({ x: 1, y: 0 })} aria-label='Move snake right'>
					Right
				</button>
				<button className='brutal-button px-2 py-1 text-xs' onClick={() => updateDirection({ x: 0, y: 1 })} aria-label='Move snake down'>
					Down
				</button>
				{!running && (
					<button className='brutal-button px-3 py-1 text-xs' onClick={restart}>
						Restart
					</button>
				)}
			</div>
			{!running && (
				<p className='mt-2 text-xs font-bold uppercase tracking-[0.12em]' aria-live='assertive'>
					Crashed. Restart to play again.
				</p>
			)}
		</section>
	);
};

export default SnakeGame;
