import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

function getSystemTheme(): Theme {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function applyTheme(nextTheme: Theme) {
	document.documentElement.classList.toggle('dark', nextTheme === 'dark');
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		const initialTheme =
			storedTheme === 'light' || storedTheme === 'dark'
				? storedTheme
				: getSystemTheme();

		setThemeState(initialTheme);
		applyTheme(initialTheme);
		setMounted(true);
	}, []);

	const setTheme = useCallback((nextTheme: Theme) => {
		setThemeState(nextTheme);
		localStorage.setItem('theme', nextTheme);
		applyTheme(nextTheme);
	}, []);

	return {
		theme,
		resolvedTheme: theme,
		setTheme,
		mounted,
	};
}
