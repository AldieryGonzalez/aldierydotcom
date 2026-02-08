import { cn } from '@/lib/utils';

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
	pathname?: string;
};

const NavLink = ({ href, className, pathname, ...props }: NavLinkProps) => {
	const active = pathname === href;
	return (
		<a
			href={href}
			className={cn(
				'brutal-button px-3 py-2 text-xs text-black',
				active ? 'bg-[var(--accent)]' : 'bg-[var(--panel)]',
				className,
			)}>
			{props.children}
		</a>
	);
};

export default NavLink;
