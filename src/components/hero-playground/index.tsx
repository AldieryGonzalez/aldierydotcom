'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bomb, RotateCcw } from 'lucide-react';
import BackgroundGrid from '@/components/grid-bg';
import GamesHub from '@/components/games-hub';
import {
	clearSessionUnlockCookie,
	setSessionUnlockCookie,
} from '@/lib/easter-egg/session';

type HeroPhase =
	| 'briefing'
	| 'grid-active'
	| 'solved'
	| 'pow-visible'
	| 'collapsing'
	| 'games-open';

const HeroPlayground = () => {
	const [phase, setPhase] = useState<HeroPhase>('briefing');
	const [selectionCount, setSelectionCount] = useState(0);
	const [panelDismissed, setPanelDismissed] = useState(false);
	const [resetSignal, setResetSignal] = useState(0);
	const [collapseSignal, setCollapseSignal] = useState(0);

	const briefingHidden = panelDismissed || phase !== 'briefing';
	const showReset = phase !== 'briefing' || panelDismissed;
	const showGamesLink =
		phase === 'pow-visible' || phase === 'collapsing' || phase === 'games-open';

	const panelClassName = useMemo(
		() =>
			[
				'relative z-20 max-w-2xl border-4 border-[var(--line)] bg-[var(--panel)] px-4 py-4 shadow-[8px_8px_0_var(--line)] md:px-5',
				'transition duration-500 ease-out',
				briefingHidden
					? '-translate-y-[140%] opacity-0 pointer-events-none'
					: 'translate-y-0 opacity-100',
			].join(' '),
		[briefingHidden],
	);

	useEffect(() => {
		if (phase === 'briefing' && selectionCount > 0) {
			setPhase('grid-active');
		}
	}, [phase, selectionCount]);

	useEffect(() => {
		if (phase !== 'solved') return;
		const timer = window.setTimeout(() => {
			setPhase('pow-visible');
		}, 980);
		return () => window.clearTimeout(timer);
	}, [phase]);

	const resetHero = () => {
		clearSessionUnlockCookie();
		setPhase('briefing');
		setSelectionCount(0);
		setPanelDismissed(false);
		setCollapseSignal(0);
		setResetSignal((prev) => prev + 1);
	};

	return (
		<div className='brutal-panel relative min-h-[540px] overflow-hidden p-5 md:p-8'>
			{showReset && (
				<div className='absolute left-5 top-5 z-50'>
					<button
						type='button'
						className='brutal-button inline-flex items-center gap-2 bg-[var(--accent-3)] px-3 py-2 text-xs text-black'
						onClick={resetHero}>
						<RotateCcw className='h-4 w-4' /> Reset
					</button>
				</div>
			)}

			<div className='absolute right-5 top-5 z-30 stamp'>
				<span className='brutal-pill bg-[var(--accent-2)] text-black shadow-[4px_4px_0_var(--line)]'>
					Find HELLO
				</span>
			</div>
			{showGamesLink && (
				<a
					href='/games'
					className='brutal-button absolute right-5 top-20 z-50 bg-[var(--accent)] px-3 py-2 text-xs text-black'>
					Open Games
				</a>
			)}

			<div className={panelClassName}>
				<button
					type='button'
					aria-label='Close briefing'
					className='brutal-button absolute right-3 top-3 grid h-8 w-8 place-items-center bg-[var(--accent-3)] p-0 text-base text-black'
					onClick={() => setPanelDismissed(true)}>
					x
				</button>
				<p className='mb-4 inline-block border-2 border-[var(--line)] bg-[var(--accent)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-black'>
					Brutalist Web Playground
				</p>
				<h1 className='text-4xl leading-[0.9] text-[var(--ink)] sm:text-6xl'>
					I Build Loud,<br />
					Useful Web Experiences.
				</h1>
				<p className='mt-4 max-w-xl border-l-4 border-[var(--line)] pl-3 text-sm font-bold text-[var(--muted-ink)] md:text-base'>
					Find HELLO, summon the POW block, and break open the hidden arcade cabinet.
				</p>
			</div>

			{phase === 'pow-visible' && (
				<motion.button
					type='button'
					className='pow-block absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2'
					initial={{ opacity: 0, scale: 0.7, y: 40 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ type: 'spring', stiffness: 320, damping: 16 }}
					whileHover={{ scale: 1.06 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => {
						setPhase('collapsing');
						setCollapseSignal((prev) => prev + 1);
					}}>
					<span className='pow-label'>POW</span>
					<Bomb className='h-6 w-6' />
				</motion.button>
			)}

			{phase === 'games-open' && (
				<div className='absolute inset-0 z-[45] p-2 sm:p-4'>
					<GamesHub locked={false} onKonamiUnlock={() => undefined} onReset={resetHero} />
				</div>
			)}

			<div className='absolute inset-0 z-10 mt-24'>
				<BackgroundGrid
					blockHeight={64}
					blockWidth={64}
					onSelectionChange={setSelectionCount}
					onSolved={() => {
						setSessionUnlockCookie();
						setPhase((prev) =>
							prev === 'collapsing' || prev === 'games-open' ? prev : 'solved',
						);
					}}
					collapseSignal={collapseSignal}
					onCollapseComplete={() => setPhase('games-open')}
					resetSignal={resetSignal}
				/>
			</div>
		</div>
	);
};

export default HeroPlayground;
