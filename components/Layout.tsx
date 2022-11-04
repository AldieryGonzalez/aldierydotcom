import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex'>
			<SideBar />
			<div className='flex flex-col ml-16 w-full'>
				<Header>text</Header>
				{children}
			</div>
		</div>
	);
};

export default Layout;
