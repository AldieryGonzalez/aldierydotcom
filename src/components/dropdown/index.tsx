'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

type DropdownProps = {
	children: React.ReactNode;
	icon: React.ReactNode;
	className?: string;
};

const Dropdown = ({ children, icon, className }: DropdownProps) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={cn('relative', className)}>
			<button
				onClick={() => setOpen((value) => !value)}
				className='brutal-button grid h-10 w-10 place-items-center bg-[var(--accent-2)] p-0 text-black'
				aria-expanded={open}
				aria-label='Toggle navigation menu'>
				{icon}
			</button>
			{open && (
				<div className='brutal-panel absolute right-0 top-[calc(100%+0.5rem)] min-w-40 p-3'>
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
