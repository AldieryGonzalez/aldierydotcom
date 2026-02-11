import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons';
import { Menu } from 'lucide-react';
import Dropdown from '../dropdown';
import ThemeSwitch from '../theme-switch';
import NavLink from './atoms/navlink';

type NavbarProps = {
	pathname: string;
};

const Navbar = ({ pathname }: NavbarProps) => {
	return (
		<header className='sticky top-0 z-50 border-b-4 border-[var(--line)] bg-[var(--paper)] px-4 py-3 md:px-8'>
			<div className='mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4'>
				<p className='border-[3px] border-[var(--line)] bg-[var(--accent)] px-3 py-1 text-sm font-bold uppercase tracking-[0.12em] text-black'>
					Aldiery Gonzalez
				</p>
				<div className='hidden items-center gap-2 sm:flex'>
					<nav className='flex items-center gap-2' aria-labelledby='primary-navigation'>
						<NavLink href='/' pathname={pathname}>
							Home
						</NavLink>
						<NavLink href='/projects' pathname={pathname}>
							Projects
						</NavLink>
						<NavLink href='/contact' pathname={pathname}>
							Contact
						</NavLink>
						<NavLink href='/games' pathname={pathname}>
							Games
						</NavLink>
					</nav>
					<nav className='ml-3 flex items-center gap-2' aria-labelledby='external-navigation'>
						<a
							className='brutal-button grid h-9 w-9 place-items-center bg-[var(--accent-3)] p-0'
							href='https://github.com/AldieryGonzalez'
							rel='noreferrer'
							target='_blank'>
							<SiGithub size={16} />
						</a>
						<a
							className='brutal-button grid h-9 w-9 place-items-center bg-[var(--accent-3)] p-0'
							href='https://www.linkedin.com/in/aldierygonzalez/'
							rel='noreferrer'
							target='_blank'>
							<SiLinkedin size={16} />
						</a>
					</nav>
					<ThemeSwitch />
				</div>
				<Dropdown
					icon={<Menu size={24} strokeWidth={2.5} />}
					className='sm:hidden'>
					<div className='flex w-full flex-col gap-2 text-sm font-semibold uppercase tracking-[0.1em]'>
						<nav className='flex flex-col gap-2'>
							<NavLink href='/' pathname={pathname}>
								Home
							</NavLink>
							<NavLink href='/projects' pathname={pathname}>
								Projects
							</NavLink>
							<NavLink href='/contact' pathname={pathname}>
								Contact
							</NavLink>
							<NavLink href='/games' pathname={pathname}>
								Games
							</NavLink>
						</nav>
						<hr className='border-2 border-[var(--line)]' />
						<nav className='flex flex-col gap-2' aria-labelledby='external-navigation'>
							<a
								className='brutal-button flex items-center justify-between bg-[var(--accent-3)] px-2 py-1 text-black'
								href='https://github.com/AldieryGonzalez'
								rel='noreferrer'
								target='_blank'>
								Github <SiGithub size={16} />
							</a>
							<a
								className='brutal-button flex items-center justify-between bg-[var(--accent-3)] px-2 py-1 text-black'
								href='https://www.linkedin.com/in/aldierygonzalez/'
								rel='noreferrer'
								target='_blank'>
								LinkedIn <SiLinkedin size={16} />
							</a>
						</nav>
						<ThemeSwitch />
					</div>
				</Dropdown>
			</div>
		</header>
	);
};

export default Navbar;
export { NavLink };
