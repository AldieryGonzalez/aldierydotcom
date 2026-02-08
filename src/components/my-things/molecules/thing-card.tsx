type ThingCardProps = {
	title: string;
	children: React.ReactNode;
};

const ThingCard = ({ title, children }: ThingCardProps) => {
	return (
		<article className='brutal-panel flex min-h-52 flex-col'>
			<h2 className='border-b-4 border-[var(--line)] bg-[var(--accent-3)] px-3 py-3 text-xl text-black'>
				{title}
			</h2>
			<p className='p-4 text-sm leading-relaxed'>{children}</p>
		</article>
	);
};

export default ThingCard;
