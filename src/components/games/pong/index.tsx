'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '@/types/games';

const WIDTH = 560;
const HEIGHT = 320;
const PADDLE_H = 70;

const PongGame = ({ isFullscreen }: GameProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const frameRef = useRef<number>();
	const keysRef = useRef({ up: false, down: false });
	const playerYRef = useRef(130);
	const enemyYRef = useRef(130);
	const ballRef = useRef({ x: WIDTH / 2, y: HEIGHT / 2, vx: 240, vy: 170 });
	const scoreRef = useRef({ player: 0, enemy: 0 });

	const [score, setScore] = useState({ player: 0, enemy: 0 });

	const movePlayer = (delta: number) => {
		playerYRef.current = Math.max(0, Math.min(HEIGHT - PADDLE_H, playerYRef.current + delta));
	};

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp') keysRef.current.up = true;
			if (event.key === 'ArrowDown') keysRef.current.down = true;
		};
		const onKeyUp = (event: KeyboardEvent) => {
			if (event.key === 'ArrowUp') keysRef.current.up = false;
			if (event.key === 'ArrowDown') keysRef.current.down = false;
		};
		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
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

		const resetBall = (toEnemy: boolean) => {
			ballRef.current = {
				x: WIDTH / 2,
				y: HEIGHT / 2,
				vx: toEnemy ? 240 : -240,
				vy: Math.random() > 0.5 ? 170 : -170,
			};
		};

		const draw = () => {
			context.clearRect(0, 0, WIDTH, HEIGHT);
			context.fillStyle = '#f4f0e4';
			context.fillRect(0, 0, WIDTH, HEIGHT);

			context.strokeStyle = 'rgba(0,0,0,0.3)';
			context.setLineDash([8, 8]);
			context.beginPath();
			context.moveTo(WIDTH / 2, 0);
			context.lineTo(WIDTH / 2, HEIGHT);
			context.stroke();
			context.setLineDash([]);

			context.fillStyle = '#ff4d00';
			context.fillRect(12, playerYRef.current, 12, PADDLE_H);
			context.fillStyle = '#4d8dff';
			context.fillRect(WIDTH - 24, enemyYRef.current, 12, PADDLE_H);

			context.fillStyle = '#000';
			const ball = ballRef.current;
			context.fillRect(ball.x - 6, ball.y - 6, 12, 12);
		};

		const loop = (now: number) => {
			const deltaSec = Math.min(0.033, (now - last) / 1000);
			last = now;

			if (keysRef.current.up) movePlayer(-300 * deltaSec);
			if (keysRef.current.down) movePlayer(300 * deltaSec);

			const enemyTarget = ballRef.current.y - PADDLE_H / 2;
			enemyYRef.current += (enemyTarget - enemyYRef.current) * Math.min(1, deltaSec * 4.2);
			enemyYRef.current = Math.max(0, Math.min(HEIGHT - PADDLE_H, enemyYRef.current));

			const ball = ballRef.current;
			ball.x += ball.vx * deltaSec;
			ball.y += ball.vy * deltaSec;

			if (ball.y <= 6 || ball.y >= HEIGHT - 6) {
				ball.vy *= -1;
				ball.y = Math.max(6, Math.min(HEIGHT - 6, ball.y));
			}

			if (ball.x <= 24 && ball.y >= playerYRef.current && ball.y <= playerYRef.current + PADDLE_H) {
				ball.vx = Math.abs(ball.vx) * 1.02;
				ball.x = 24;
			}

			if (ball.x >= WIDTH - 24 && ball.y >= enemyYRef.current && ball.y <= enemyYRef.current + PADDLE_H) {
				ball.vx = -Math.abs(ball.vx) * 1.02;
				ball.x = WIDTH - 24;
			}

			if (ball.x < -10) {
				scoreRef.current = { ...scoreRef.current, enemy: scoreRef.current.enemy + 1 };
				setScore(scoreRef.current);
				resetBall(true);
			}
			if (ball.x > WIDTH + 10) {
				scoreRef.current = { ...scoreRef.current, player: scoreRef.current.player + 1 };
				setScore(scoreRef.current);
				resetBall(false);
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
		<section className='h-full w-full p-3 text-[var(--ink)]' aria-labelledby='pong-title'>
			<div className='mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em]'>
				<h3 id='pong-title'>Pong</h3>
				<p aria-live='polite'>
					{score.player} : {score.enemy}
				</p>
			</div>
			<p id='pong-help' className='mb-2 text-[11px] font-semibold uppercase tracking-[0.1em]'>
				Use up/down arrows or controls.
			</p>
			<canvas
				ref={canvasRef}
				width={WIDTH}
				height={HEIGHT}
				className={`block w-full border-4 border-[var(--line)] bg-[var(--paper)] ${isFullscreen ? 'max-w-[960px]' : 'max-w-[560px]'}`}
				role='img'
				aria-label='Pong game arena'
				aria-describedby='pong-help'
			/>
			<div className='mt-3 flex items-center gap-2'>
				<button className='brutal-button px-2 py-1 text-xs' onMouseDown={() => movePlayer(-28)} aria-label='Move paddle up'>
					Up
				</button>
				<button className='brutal-button px-2 py-1 text-xs' onMouseDown={() => movePlayer(28)} aria-label='Move paddle down'>
					Down
				</button>
			</div>
		</section>
	);
};

export default PongGame;
