import React, { ReactNode } from "react";
import Link from "next/link";

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<div className='w-full h-16 bg-gradient-to-r from-layoutPrimary to-layoutAccent px-16 flex items-center justify-between text-white'>
			<h1 className='font-semibold text-2xl'>{children}</h1>
			<div className='flex gap-8'>
				<Link href={"/"}>Home</Link>
				<Link href={"/projects"}>Projects</Link>
				<Link href={"/contact"}>Contact</Link>
			</div>
		</div>
	);
};

const NavLink = () => {};

export default Header;
