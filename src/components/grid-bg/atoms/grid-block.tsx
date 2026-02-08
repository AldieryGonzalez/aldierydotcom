import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

type GridBlockProps = {
	width: number;
	height: number;
};

function GridBlock({ width, height }: GridBlockProps) {
	const { resolvedTheme: theme } = useTheme();
	return (
		<motion.div
			className='border-r-2 border-t-2 border-[var(--line)]'
			whileHover={{
				backgroundColor: theme === 'light' ? 'rgba(255, 217, 26, 0.48)' : 'rgba(255, 224, 70, 0.2)',
			}}
			transition={{ ease: 'easeOut', duration: 0.2 }}
			style={{
				width,
				height,
				backgroundColor: theme === 'light' ? 'rgba(255, 249, 236, 0.92)' : 'rgba(25, 25, 25, 0.9)',
			}}
		/>
	);
}

export default GridBlock;
