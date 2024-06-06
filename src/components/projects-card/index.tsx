import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ProjectCardProps = {
	img: string;
	gif?: string;
	title: string;
	link: string;
	children: React.ReactNode;
};

const ProjectCard = ({
	img,
	gif,
	title,
	link,
	children,
	...props
}: ProjectCardProps) => {
	return (
		<Link
			href={link}
			className='relative z-10 overflow-hidden rounded-lg border border-foreground/25 shadow-lg backdrop-blur-2xl transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.02]'>
			<span className='sr-only'>View Project</span>

			<Image
				alt={title}
				className='h-60 w-full object-cover '
				height='300'
				src={img}
				style={{
					aspectRatio: '400/300',
					objectFit: 'cover',
				}}
				width='400'
			/>
			<div className='h-full bg-white/50 p-4 dark:bg-foreground/5'>
				<h3 className='text-lg font-semibold md:text-xl'>{title}</h3>
				<div className='line-clamp-4 text-sm text-gray-500 dark:text-gray-400'>
					{children}
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
