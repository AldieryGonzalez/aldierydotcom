'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '@/types/games';

type Brick = {
	x: number;
	y: number;
	hits: number;
};

const WIDTH = 620;
const HEIGHT = 360;
const PADDLE_WIDTH = 108;
const BALL_SIZE = 12;
const BRICK_W = 56;
const BRICK_H = 18;

function createBricks() {
	const bricks: Brick[] = [];
	for (let row = 0; row < 5; row += 1) {
		for (let col = 0; col < 9; col += 1) {
			bricks.push({
				x: 20 + col * 64,
				y: 24 + row * 28,
				hits: row > 2 ? 2 : 1,
			});
		}
	}
	return bricks;
}

const BrutalBreaker = ({ isFullscreen }: GameProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frameRef = useRef<number>();
	const keysRef = useRef({ left: false, right: false });
	const paddleRef = useRef(WIDTH / 2 - PADDLE_WIDTH / 2);
	const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT - 60, vx: 220, vy: -240 });
	const bricksRef = useRef<Brick[]>(createBricks());
	const scoreRef = useRef(0);
	const livesRef = useRef(3);

	const [score, setScore] = useState(0);
	const [lives, setLives] = useState(3);
	const [boardCleared, setBoardCleared] = useState(false);

	const restart = () => {
		bricksRef.current = createBricks();
		ballRef.current = { x: WIDTH / 2, y: HEIGHT - 60, vx: 220, vy: -240 };
		paddleRef.current = WIDTH / 2 - PADDLE_WIDTH / 2;
		scoreRef.current = 0;
		livesRef.current = 3;
		setScore(0);
		setLives(3);
		setBoardCleared(false);
	};

	useEffect(() => {
		const onMouseMove = (event: MouseEvent) => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const rect = canvas.getBoundingClientRect();
			if (event.clientX < rect.left || event.clientX > rect.right) return;
			const ratio = (event.clientX - rect.left) / rect.width;
			paddleRef.current = Math.max(
				8,
				Math.min(WIDTH - PADDLE_WIDTH - 8, ratio * WIDTH - PADDLE_WIDTH / 2),
			);
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') keysRef.current.left = true;
			if (event.key === 'ArrowRight') keysRef.current.right = true;
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'ArrowLeft') keysRef.current.left = false;
			if (event.key === 'ArrowRight') keysRef.current.right = false;
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext('2d');
		if (!context) return;

		let last = performance.now();

		const draw = () => {
			context.clearRect(0, 0, WIDTH, HEIGHT);
			context.fillStyle = '#f4f0e4';
			context.fillRect(0, 0, WIDTH, HEIGHT);

			bricksRef.current.forEach((brick) => {
				context.fillStyle = brick.hits > 1 ? '#4d8dff' : '#ff4d00';
				context.fillRect(brick.x, brick.y, BRICK_W, BRICK_H);
				context.strokeStyle = '#000';
				context.lineWidth = 2;
				context.strokeRect(brick.x, brick.y, BRICK_W, BRICK_H);
			});

			context.fillStyle = '#000';
			context.fillRect(paddleRef.current, HEIGHT - 20, PADDLE_WIDTH, 10);

			context.beginPath();
			context.arc(ballRef.current.x, ballRef.current.y, BALL_SIZE / 2, 0, Math.PI * 2);
			context.fill();
		};

		const loop = (now: number) => {
			const deltaSec = Math.min(0.033, (now - last) / 1000);
			last = now;

			if (livesRef.current > 0 && bricksRef.current.length > 0) {
				if (keysRef.current.left) paddleRef.current = Math.max(8, paddleRef.current - 340 * deltaSec);
				if (keysRef.current.right) {
					paddleRef.current = Math.min(WIDTH - PADDLE_WIDTH - 8, paddleRef.current + 340 * deltaSec);
				}

				const ball = ballRef.current;
				ball.x += ball.vx * deltaSec;
				ball.y += ball.vy * deltaSec;

				if (ball.x <= BALL_SIZE / 2 || ball.x >= WIDTH - BALL_SIZE / 2) ball.vx *= -1;
				if (ball.y <= BALL_SIZE / 2) ball.vy *= -1;

				const paddleTop = HEIGHT - 20;
				if (
					ball.y + BALL_SIZE / 2 >= paddleTop &&
					ball.y + BALL_SIZE / 2 <= paddleTop + 10 &&
					ball.x >= paddleRef.current &&
					ball.x <= paddleRef.current + PADDLE_WIDTH
				) {
					ball.vy = -Math.abs(ball.vy);
					const offset = ball.x - (paddleRef.current + PADDLE_WIDTH / 2);
					ball.vx += offset * 0.6;
				}

				const remaining: Brick[] = [];
				let collided = false;
				for (const brick of bricksRef.current) {
					const hit =
						!collided &&
						ball.x + BALL_SIZE / 2 >= brick.x &&
						ball.x - BALL_SIZE / 2 <= brick.x + BRICK_W &&
						ball.y + BALL_SIZE / 2 >= brick.y &&
						ball.y - BALL_SIZE / 2 <= brick.y + BRICK_H;
					if (hit) {
						collided = true;
						ball.vy *= -1;
						scoreRef.current += 100;
						setScore(scoreRef.current);
						const nextHits = brick.hits - 1;
						if (nextHits > 0) {
							remaining.push({ ...brick, hits: nextHits });
						}
					} else {
						remaining.push(brick);
					}
				}
				bricksRef.current = remaining;

				if (ball.y > HEIGHT + BALL_SIZE) {
					livesRef.current -= 1;
					setLives(livesRef.current);
					ballRef.current = { x: WIDTH / 2, y: HEIGHT - 60, vx: 220, vy: -240 };
				}

				if (bricksRef.current.length === 0) {
					setBoardCleared(true);
				}
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
		<section className='h-full w-full p-3 text-[var(--ink)]' aria-labelledby='breaker-title'>
			<div className='mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em]'>
				<h3 id='breaker-title'>Brutal Breaker</h3>
				<p aria-live='polite'>
					Score {score} | Lives {lives}
				</p>
			</div>
			<p id='breaker-help' className='mb-2 text-[11px] font-semibold uppercase tracking-[0.1em]'>
				Move with mouse or left/right arrows.
			</p>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				className={`block w-full border-4 border-[var(--line)] bg-[var(--paper)] ${isFullscreen ? 'max-w-[980px]' : 'max-w-[620px]'}`}
				role='img'
				aria-label='Brutal Breaker game board'
				aria-describedby='breaker-help'
			/>
			<div className='mt-3 flex flex-wrap items-center gap-2'>
				<button className='brutal-button px-2 py-1 text-xs' onMouseDown={() => (paddleRef.current = Math.max(8, paddleRef.current - 40))} aria-label='Move paddle left'>
					Left
				</button>
				<button className='brutal-button px-2 py-1 text-xs' onMouseDown={() => (paddleRef.current = Math.min(WIDTH - PADDLE_WIDTH - 8, paddleRef.current + 40))} aria-label='Move paddle right'>
					Right
				</button>
				{(lives <= 0 || boardCleared) && (
					<button className='brutal-button px-3 py-1 text-xs' onClick={restart}>
						Restart
					</button>
				)}
			</div>
			{(lives <= 0 || boardCleared) && (
				<p className='mt-2 text-xs font-bold uppercase tracking-[0.1em]' aria-live='assertive'>
					{lives <= 0 ? 'Game over.' : 'Board cleared.'}
				</p>
			)}
		</section>
	);
};

export default BrutalBreaker;
