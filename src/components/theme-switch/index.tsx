'use client';

import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState } from 'react';
import ThemeSwitchButton from './atoms/switch-button';

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme: theme, mounted: themeMounted } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted || !themeMounted) {
		return (
			<div className='brutal-button grid h-10 w-10 place-items-center bg-[var(--accent-2)] p-0 text-black'>
				<SunMoon />
			</div>
		);
	}

	if (theme === 'dark') {
		return (
			<ThemeSwitchButton onClick={() => setTheme('light')}>
				<Moon />
			</ThemeSwitchButton>
		);
	}
	return (
		<ThemeSwitchButton onClick={() => setTheme('dark')}>
			<Sun />
		</ThemeSwitchButton>
	);
}
