import React, { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<div className='w-full h-16 bg-gradient-to-r from-layoutPrimary via-layoutAccent pl-16 flex items-center'>
			<h1 className='text-white font-semibold text-2xl'>{children}</h1>
		</div>
	);
};

export default Header;
