type ThemeSwitchButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeSwitchButton = ({ children, ...props }: ThemeSwitchButtonProps) => {
	return (
		<button
			className='brutal-button grid h-10 w-10 place-items-center bg-[var(--accent-2)] p-0 text-black'
			{...props}>
			{children}
		</button>
	);
};

export default ThemeSwitchButton;
