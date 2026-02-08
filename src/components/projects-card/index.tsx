import React from 'react';

type ProjectCardProps = {
	img: string;
	title: string;
	link: string;
	children: React.ReactNode;
};

const ProjectCard = ({ img, title, link, children }: ProjectCardProps) => {
	return (
		<a
			href={link}
			rel='noreferrer'
			target='_blank'
			className='brutal-panel group relative flex flex-col overflow-hidden transition-transform duration-150 hover:-translate-x-1 hover:-translate-y-1'>
			<span className='sr-only'>View project</span>
			<div className='relative border-b-4 border-[var(--line)]'>
				<img
					alt={title}
					className='h-52 w-full object-cover saturate-[1.1] transition duration-300 group-hover:grayscale-[0.15]'
					height={300}
					src={img}
					width={400}
				/>
				<div className='absolute left-3 top-3 border-[3px] border-[var(--line)] bg-[var(--accent)] px-2 py-1 text-xs font-bold uppercase tracking-[0.12em] text-black'>
					Live
				</div>
			</div>
			<div className='flex grow flex-col gap-3 p-4'>
				<h3 className='text-2xl'>{title}</h3>
				<p className='text-sm leading-relaxed text-[var(--muted-ink)]'>{children}</p>
			</div>
		</a>
	);
};

export default ProjectCard;
