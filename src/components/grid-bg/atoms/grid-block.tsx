import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

type CollapsePhase = 'idle' | 'collapsing' | 'collapsed';

type GridBlockProps = {
	width: number;
	height: number;
	cellIndex: number;
	collapsePhase: CollapsePhase;
};

function GridBlock({ width, height, cellIndex, collapsePhase }: GridBlockProps) {
	const { resolvedTheme: theme } = useTheme();
	const collapseDelay = (cellIndex % 12) * 0.015;

	return (
		<motion.div
			className='border-r-2 border-t-2 border-[var(--line)]'
			whileHover={
				collapsePhase === 'idle'
					? {
							backgroundColor:
								theme === 'light'
									? 'rgba(255, 217, 26, 0.48)'
									: 'rgba(255, 224, 70, 0.2)',
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
				duration: collapsePhase === 'idle' ? 0.2 : 0.62,
				delay: collapsePhase === 'idle' ? 0 : collapseDelay,
			}}
			style={{
				width,
				height,
				backgroundColor:
					theme === 'light' ? 'rgba(255, 249, 236, 0.92)' : 'rgba(25, 25, 25, 0.9)',
			}}
		/>
	);
}

export default GridBlock;
