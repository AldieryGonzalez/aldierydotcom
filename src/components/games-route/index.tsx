'use client';

import { useEffect, useState } from 'react';
import GamesHub from '@/components/games-hub';
import {
	clearSessionUnlockCookie,
	hasSessionUnlockCookie,
	setSessionUnlockCookie,
} from '@/lib/easter-egg/session';

const GamesRoute = () => {
	const [locked, setLocked] = useState(true);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setLocked(!hasSessionUnlockCookie());
		setReady(true);
	}, []);

	if (!ready) {
		return (
			<div className='brutal-panel p-6'>
				<p className='text-sm font-bold uppercase tracking-[0.15em]'>Loading arcade gate...</p>
			</div>
		);
	}

	return (
		<GamesHub
			locked={locked}
			onKonamiUnlock={() => {
				setSessionUnlockCookie();
				setLocked(false);
			}}
			onReset={() => {
				clearSessionUnlockCookie();
				setLocked(true);
			}}
		/>
	);
};

export default GamesRoute;
