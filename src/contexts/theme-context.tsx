'use client';
import { cn } from '@/lib/utils';
import { createContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
	children: React.ReactNode;
};

type Theme = 'dark' | 'light';
type LocalTheme = Theme | null;

type ThemeContextType = {
	theme: 'dark' | 'light';
	toggleMode: () => void;
	setTheme: (themeMode: 'dark' | 'light') => void;
};
export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	let localTheme = null as LocalTheme;
	if (typeof window !== 'undefined') {
		localTheme = localStorage.getItem('theme') as LocalTheme;
	}
	const [mode, setMode] = useState<'dark' | 'light'>(localTheme ?? 'dark');
	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (!theme) {
			const query = window.matchMedia('(prefers-color-scheme: dark)');
			if (query.matches) {
				setMode('dark');
			}
			query.addEventListener('change', (evt) =>
				setMode(evt.matches ? 'dark' : 'light'),
			);
			return () => query.removeEventListener('change', () => {});
		}
		setMode(theme as 'dark' | 'light');
	}, []);

	const toggleMode = () => {
		setMode((prev) => {
			if (prev == 'dark') {
				localStorage.setItem('theme', 'light');
				return 'light';
			}
			localStorage.setItem('theme', 'dark');
			return 'dark';
		});
	};
	const setTheme = (themeMode: typeof mode) => {
		localStorage.setItem('theme', themeMode);
		setMode(themeMode);
	};
	const value = {
		theme: mode,
		setTheme,
		toggleMode,
	};
	return (
		<ThemeContext.Provider value={value}>
			<div>{children}</div>
		</ThemeContext.Provider>
	);
}
