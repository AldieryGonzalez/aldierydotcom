import ThingCard from './molecules/thing-card';

const MyThings = () => {
	return (
		<section className='grid gap-4 md:grid-cols-3'>
			<ThingCard title='Designer'>
				I design interfaces with strong visual direction and intentional interaction patterns.
			</ThingCard>
			<ThingCard title='Creator'>
				I ship projects often and treat each one as an experiment in clarity, utility, and personality.
			</ThingCard>
			<ThingCard title='Developer'>
				I focus on practical full-stack builds in the React ecosystem with an eye for clean, maintainable systems.
			</ThingCard>
		</section>
	);
};

export default MyThings;
