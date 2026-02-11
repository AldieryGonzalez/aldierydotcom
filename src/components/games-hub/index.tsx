'use client';

import { useEffect, useMemo, useState } from 'react';
import { Expand, Gamepad2, Lock, RotateCcw, Unlock } from 'lucide-react';
import { GAME_REGISTRY } from '@/lib/games/registry';
import { cn } from '@/lib/utils';
import type { GameId } from '@/types/games';

type GamesHubProps = {
	locked: boolean;
	onKonamiUnlock: () => void;
	onReset: () => void;
};

const KONAMI_SEQUENCE = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
];

function normalizeKey(key: string) {
	return key.length === 1 ? key.toLowerCase() : key;
}

const GamesHub = ({ locked, onKonamiUnlock, onReset }: GamesHubProps) => {
	const [activeGameId, setActiveGameId] = useState<GameId>(GAME_REGISTRY[0]?.id ?? '');
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [progress, setProgress] = useState(0);
	const [failedPulse, setFailedPulse] = useState(false);
	const [unlockFlash, setUnlockFlash] = useState(false);

	const activeGame = useMemo(
		() => GAME_REGISTRY.find((game) => game.id === activeGameId) ?? GAME_REGISTRY[0],
		[activeGameId],
	);

	useEffect(() => {
		if (!locked) {
			setProgress(0);
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			const key = normalizeKey(event.key);
			const expected = KONAMI_SEQUENCE[progress];

			if (key === normalizeKey(expected)) {
				const nextProgress = progress + 1;
				if (nextProgress >= KONAMI_SEQUENCE.length) {
					setProgress(0);
					setUnlockFlash(true);
					window.setTimeout(() => {
						onKonamiUnlock();
						setUnlockFlash(false);
					}, 300);
					return;
				}
				setProgress(nextProgress);
				return;
			}

			setFailedPulse(true);
			window.setTimeout(() => setFailedPulse(false), 260);
			setProgress(key === normalizeKey(KONAMI_SEQUENCE[0]) ? 1 : 0);
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [locked, onKonamiUnlock, progress]);

	useEffect(() => {
		if (!isFullscreen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFullscreen(false);
			}
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [isFullscreen]);

	useEffect(() => {
		if (locked) {
			setIsFullscreen(false);
		}
	}, [locked]);

	const ActiveGameComponent = activeGame?.component;

	return (
		<section
			className='games-window brutal-panel relative min-h-[480px] overflow-hidden p-4 md:p-6'
			aria-labelledby='games-hub-title'>
			<div className='mb-4 flex items-center justify-between gap-3'>
				<div>
					<p className='text-xs font-bold uppercase tracking-[0.18em]'>Games Window</p>
					<h2 id='games-hub-title' className='mt-1 text-3xl sm:text-4xl'>
						Arcade Cabinet
					</h2>
				</div>
				<button
					type='button'
					className='brutal-button inline-flex items-center gap-2 bg-[var(--accent-3)] px-3 py-2 text-xs text-black'
					aria-label='Reset games and lock cabinet'
					onClick={onReset}>
					<RotateCcw className='h-4 w-4' /> Reset
				</button>
			</div>

			<div className='grid gap-4 lg:grid-cols-[280px_1fr]'>
				<nav className='space-y-3' aria-label='Game selection'>
					{GAME_REGISTRY.map((game) => {
						const selected = game.id === activeGame?.id;
						return (
							<article
								key={game.id}
								className={cn(
									'brutal-panel p-3 transition',
									selected ? 'translate-x-1 translate-y-1 shadow-[4px_4px_0_var(--line)]' : '',
									locked ? 'opacity-70' : '',
								)}>
								<div className='mb-2 flex items-center justify-between'>
									<p className='text-xs font-bold uppercase tracking-[0.15em]'>{game.badge}</p>
									{locked ? <Lock className='h-4 w-4' /> : <Unlock className='h-4 w-4' />}
								</div>
								<h3 id={`game-title-${game.id}`} className='text-2xl'>
									{game.title}
								</h3>
								<p className='mt-2 text-xs leading-relaxed'>{game.description}</p>

								<div className='mt-3 flex flex-wrap gap-2'>
									{(game.launchMode === 'inline' || game.launchMode === 'both') && (
										<button
											type='button'
											onClick={() => setActiveGameId(game.id)}
											disabled={locked}
											aria-label={`Play ${game.title} in this page`}
											aria-pressed={selected}
											aria-describedby={`game-title-${game.id}`}
											className='brutal-button bg-[var(--accent)] px-2 py-1 text-[10px] text-black disabled:cursor-not-allowed disabled:opacity-40'>
											Play Here
										</button>
									)}
									{(game.launchMode === 'standalone' || game.launchMode === 'both') && game.route && (
										<a
											href={game.route}
											className='brutal-button bg-[var(--accent-2)] px-2 py-1 text-[10px] text-black'
											onClick={(event) => {
												if (locked) event.preventDefault();
											}}
											aria-disabled={locked}
											tabIndex={locked ? -1 : 0}>
											Open Game Page
										</a>
									)}
								</div>
							</article>
						);
					})}
				</nav>

				<section
					className='brutal-panel relative min-h-[360px] bg-[var(--paper)] p-2 sm:p-3'
					aria-label='Active game viewport'>
					<div className='mb-2 flex items-center justify-between gap-2 border-b-4 border-[var(--line)] px-2 pb-2'>
						<div className='inline-flex items-center gap-2'>
							<Gamepad2 className='h-4 w-4' />
							<p className='text-xs font-bold uppercase tracking-[0.14em]'>
								{activeGame?.title ?? 'No Game Selected'}
							</p>
						</div>
						{activeGame?.component && !locked && (
							<button
								type='button'
								className='brutal-button inline-flex items-center gap-1 bg-[var(--accent-3)] px-2 py-1 text-[10px] text-black'
								aria-label={`Open ${activeGame.title} in fullscreen`}
								onClick={() => setIsFullscreen(true)}>
								<Expand className='h-3 w-3' /> Fullscreen
							</button>
						)}
					</div>

					{ActiveGameComponent ? (
						<ActiveGameComponent
							isFullscreen={false}
							onExitFullscreen={() => setIsFullscreen(false)}
						/>
					) : (
						<div className='p-4 text-sm font-bold uppercase tracking-[0.12em]'>
							Select a game from the left.
						</div>
					)}

					{locked && (
						<div
							className={cn(
								'absolute inset-0 z-30 grid place-items-center bg-black/50 p-4',
								unlockFlash ? 'opacity-0 transition-opacity duration-300' : 'opacity-100',
								failedPulse ? 'konami-fail' : '',
							)}>
							<div className='brutal-panel max-w-md bg-[var(--accent-2)] p-4 text-black'>
								<p className='text-xs font-black uppercase tracking-[0.2em]'>Hidden Access Required</p>
								<h3 className='mt-2 text-3xl'>Cabinet Locked</h3>
								<p className='mt-3 text-xs font-semibold leading-relaxed uppercase tracking-[0.12em]'>
									Hint: veterans of old gamepads know the path.
								</p>
								<div
									className='mt-3 border-2 border-black bg-[var(--paper)] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em]'
									role='status'
									aria-live='polite'>
									Konami Progress: {progress}/{KONAMI_SEQUENCE.length}
								</div>
							</div>
						</div>
					)}
				</section>
			</div>

			{isFullscreen && ActiveGameComponent && !locked && (
				<div
					className='games-fullscreen fixed inset-0 z-[80] bg-black/70 p-4 sm:p-8'
					role='dialog'
					aria-modal='true'
					aria-label={`${activeGame.title} fullscreen mode`}>
					<div className='brutal-panel relative mx-auto h-full max-w-[1200px] bg-[var(--paper)] p-3 sm:p-5'>
						<button
							type='button'
							className='brutal-button absolute right-3 top-3 z-20 bg-[var(--accent)] px-3 py-2 text-xs text-black'
							aria-label='Close fullscreen game'
							onClick={() => setIsFullscreen(false)}>
							Close
						</button>
						<ActiveGameComponent
							isFullscreen={true}
							onExitFullscreen={() => setIsFullscreen(false)}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default GamesHub;
