import { motion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import GridBlock from '../atoms/grid-block';
import GridButton from '../atoms/grid-button';

type CollapsePhase = 'idle' | 'collapsing' | 'collapsed';

type GridRowProps = {
	row: number[];
	i: number;
	blockWidth: number;
	blockHeight: number;
	hue: MotionValue<number>;
	coordinatesArray: string[];
	message: string;
	selected: number[];
	won: boolean;
	collapsePhase: CollapsePhase;
	setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

function GridRow({
	row,
	i,
	blockWidth,
	blockHeight,
	coordinatesArray,
	message,
	hue,
	selected,
	won,
	collapsePhase,
	setSelected,
}: GridRowProps) {
	return (
		<motion.div key={i} className='flex'>
			{row.map((_, j) => {
				const coord = `${i}_${j}`;
				const cellIndex = i * row.length + j;
				const buttonIndex = coordinatesArray.indexOf(coord);
				if (buttonIndex !== -1) {
					return (
						<GridButton
							key={coord}
							width={blockWidth}
							hue={hue}
							buttonIndex={buttonIndex}
							cellIndex={cellIndex}
							height={blockHeight}
							message={message}
							selected={selected}
							won={won}
							collapsePhase={collapsePhase}
							setSelected={setSelected}
						/>
					);
				}
				return (
					<GridBlock
						key={coord}
						width={blockWidth}
						height={blockHeight}
						cellIndex={cellIndex}
						collapsePhase={collapsePhase}
					/>
				);
			})}
		</motion.div>
	);
}

export default GridRow;
