'use client';

import { getGameById } from '@/lib/games/registry';
import type { GameId } from '@/types/games';

type StandaloneGameProps = {
	gameId: GameId;
};

const StandaloneGame = ({ gameId }: StandaloneGameProps) => {
	const game = getGameById(gameId);

	if (!game?.component) {
		return (
			<div className='brutal-panel p-6'>
				<p className='text-sm font-bold uppercase tracking-[0.12em]'>Game not found.</p>
			</div>
		);
	}

	const GameComponent = game.component;

	return (
		<div className='brutal-panel p-4 sm:p-6'>
			<div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
				<div>
					<p className='text-xs font-bold uppercase tracking-[0.16em]'>{game.badge}</p>
					<h1 className='mt-1 text-3xl sm:text-5xl'>{game.title}</h1>
				</div>
				<a className='brutal-button px-3 py-2 text-xs text-black' href='/games'>
					Back to Hub
				</a>
			</div>
			<div className='brutal-panel min-h-[62vh] bg-[var(--paper)] p-3'>
				<GameComponent isFullscreen={true} onExitFullscreen={() => undefined} />
			</div>
		</div>
	);
};

export default StandaloneGame;
