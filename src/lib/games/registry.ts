import type { GameDefinition, GameId } from '@/types/games';
import SnakeGame from '@/components/games/snake';
import PongGame from '@/components/games/pong';
import BrutalBreaker from '@/components/games/brutal-breaker';

export const GAME_REGISTRY: GameDefinition[] = [
	{
		id: 'snake',
		title: 'Snake',
		description: 'Collect blocks, grow longer, and avoid crashing into yourself.',
		badge: 'Arcade',
		launchMode: 'both',
		component: SnakeGame,
		route: '/games/snake',
		thumbnailClassName: 'bg-[var(--accent)]',
	},
	{
		id: 'pong',
		title: 'Pong',
		description: 'Classic paddle duel with a reactive AI opponent.',
		badge: 'Classic',
		launchMode: 'both',
		component: PongGame,
		route: '/games/pong',
		thumbnailClassName: 'bg-[var(--accent-3)]',
	},
	{
		id: 'brutal-breaker',
		title: 'Brutal Breaker',
		description: 'Break every brick while surviving with limited lives.',
		badge: 'Showcase',
		launchMode: 'both',
		component: BrutalBreaker,
		route: '/games/brutal-breaker',
		thumbnailClassName: 'bg-[var(--accent-2)]',
	},
];

export function getGameById(gameId: GameId) {
	return GAME_REGISTRY.find((game) => game.id === gameId);
}
