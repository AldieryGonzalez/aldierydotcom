'use client';

const ContactForm = () => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
	};

	const inputClass =
		'w-full border-[3px] border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-medium outline-none transition focus:bg-[var(--accent-2)]/50';

	return (
		<form className='space-y-4 text-[var(--ink)]' onSubmit={handleSubmit}>
			<div>
				<label className='mb-1 block text-xs font-bold uppercase tracking-[0.12em]' htmlFor='name'>
					Name
				</label>
				<input className={inputClass} id='name' name='name' placeholder='Enter your name' type='text' />
			</div>
			<div>
				<label className='mb-1 block text-xs font-bold uppercase tracking-[0.12em]' htmlFor='email'>
					Email
				</label>
				<input className={inputClass} id='email' name='email' placeholder='Enter your email' type='email' />
			</div>
			<div>
				<label className='mb-1 block text-xs font-bold uppercase tracking-[0.12em]' htmlFor='message'>
					Message
				</label>
				<textarea className={inputClass} id='message' name='message' placeholder='What are you trying to build?' rows={5} />
			</div>
			<button className='brutal-button w-full px-4 py-3 text-sm' type='submit'>
				Send
			</button>
		</form>
	);
};

export default ContactForm;
