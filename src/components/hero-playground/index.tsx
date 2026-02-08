'use client';

import { useMemo, useState } from 'react';
import BackgroundGrid from '@/components/grid-bg';

const HeroPlayground = () => {
	const [selectionCount, setSelectionCount] = useState(0);
	const [panelDismissed, setPanelDismissed] = useState(false);
	const [resetSignal, setResetSignal] = useState(0);

	const panelHidden = panelDismissed || selectionCount > 0;

	const panelClassName = useMemo(
		() =>
			[
				'relative z-20 max-w-2xl border-4 border-[var(--line)] bg-[var(--panel)] px-4 py-4 shadow-[8px_8px_0_var(--line)] md:px-5',
				'transition duration-500 ease-out',
				panelHidden
					? '-translate-y-[140%] opacity-0 pointer-events-none'
					: 'translate-y-0 opacity-100',
			].join(' '),
		[panelHidden],
	);

	return (
		<div className='brutal-panel relative min-h-[480px] overflow-hidden p-5 md:p-8'>
			{panelHidden && (
				<div className='absolute left-5 top-5 z-40'>
					<button
						type='button'
						className='brutal-button bg-[var(--accent-3)] px-3 py-2 text-xs text-black'
						onClick={() => {
							setPanelDismissed(false);
							setSelectionCount(0);
							setResetSignal((prev) => prev + 1);
						}}>
						Reset
					</button>
				</div>
			)}
			<div className='absolute right-5 top-5 z-30 stamp'>
				<span className='brutal-pill bg-[var(--accent-2)] text-black shadow-[4px_4px_0_var(--line)]'>
					Find HELLO
				</span>
			</div>
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
					This grid is part of the layout now, not a background effect. The hidden HELLO
					minigame is still live.
				</p>
			</div>
			<div className='absolute inset-0 z-10 mt-24'>
				<BackgroundGrid
					blockHeight={64}
					blockWidth={64}
					onSelectionChange={setSelectionCount}
					resetSignal={resetSignal}
				/>
			</div>
		</div>
	);
};

export default HeroPlayground;
