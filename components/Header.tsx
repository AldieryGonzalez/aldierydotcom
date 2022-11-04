import React, { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<div className='w-full h-16 bg-gray-700 p-4 flex items-center'>
			<h1 className='text-white font-semibold text-2xl'>{children}</h1>
		</div>
	);
};

export default Header;
