import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";

const Layout = ({ children, title }: { children: ReactNode; title: any }) => {
	return (
		<div className='flex'>
			<SideBar />
			<div className='flex flex-col ml-16 w-full'>
				<Header>{title}</Header>
				{children}
			</div>
		</div>
	);
};

export const getLayout = (page: any, { title }: any) => {
	return <Layout title={title}>{page}</Layout>;
};

export default Layout;
