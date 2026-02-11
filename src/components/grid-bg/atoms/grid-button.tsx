import { motion, useMotionTemplate } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

type CollapsePhase = 'idle' | 'collapsing' | 'collapsed';

type GridButtonProps = {
	width: number;
	height: number;
	message: string;
	selected: number[];
	won: boolean;
	hue: MotionValue<number>;
	buttonIndex: number;
	cellIndex: number;
	collapsePhase: CollapsePhase;
	setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

function GridButton({
	width,
	height,
	message,
	hue,
	selected,
	won,
	buttonIndex,
	cellIndex,
	collapsePhase,
	setSelected,
}: GridButtonProps) {
	const { resolvedTheme: theme } = useTheme();
	const activated = selected.length === message.length;
	const isSelected = selected.includes(buttonIndex);
	const camoGlyphs = ['#', '%', '+', '/', '?', '*', '&'];
	const displayGlyph = isSelected
		? message[buttonIndex]
		: camoGlyphs[buttonIndex % camoGlyphs.length];
	const color = useMotionTemplate`hsl(${hue}, 100%, 55%)`;
	const collapseDelay = (cellIndex % 12) * 0.015;
	const isInteractive = collapsePhase === 'idle';

	return (
		<motion.button
			className='cursor-pointer border-r-2 border-t-2 border-[var(--line)] text-3xl font-black text-black focus:z-[5]'
			onClick={() => {
				if (won || !isInteractive) return;
				setSelected((prev) => {
					if (prev.includes(buttonIndex)) {
						return prev.filter((index) => index !== buttonIndex);
					}
					return [...prev, buttonIndex];
				});
			}}
			whileHover={
				isInteractive
					? {
							backgroundColor:
								theme === 'light'
									? 'rgba(77,141,255,0.3)'
									: 'rgba(122,167,255,0.25)',
						}
					: undefined
			}
			animate={
				collapsePhase === 'idle'
					? { y: 0, rotate: 0, opacity: 1 }
					: {
						y: 280 + (cellIndex % 6) * 32,
						rotate: ((cellIndex % 9) - 4) * 9,
						opacity: 0,
					}
			}
			transition={{
				ease: 'easeIn',
				duration: collapsePhase === 'idle' ? 0.18 : 0.62,
				delay: collapsePhase === 'idle' ? 0 : collapseDelay,
			}}
			style={{
				width,
				height,
				backgroundColor: activated
					? color
					: theme === 'light'
						? isSelected
							? 'rgba(255, 77, 0, 0.8)'
							: 'rgba(255, 249, 236, 0.95)'
						: isSelected
							? 'rgba(255, 106, 0, 0.8)'
							: 'rgba(25, 25, 25, 0.92)',
				color: activated
					? 'black'
					: isSelected
						? 'black'
						: theme === 'light'
							? 'rgba(11,11,11,0.35)'
							: 'rgba(250,247,240,0.35)',
			}}
			disabled={!isInteractive}>
			{displayGlyph}
		</motion.button>
	);
}

export default GridButton;
