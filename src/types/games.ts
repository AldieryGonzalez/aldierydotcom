import type { ComponentType } from 'react';

export type GameId = string;

export type GameLaunchMode = 'inline' | 'standalone' | 'both';

export type GameProps = {
	isFullscreen: boolean;
	onExitFullscreen: () => void;
};

export type GameDefinition = {
	id: GameId;
	title: string;
	description: string;
	badge: string;
	launchMode: GameLaunchMode;
	component?: ComponentType<GameProps>;
	route?: string;
	thumbnailClassName?: string;
};
