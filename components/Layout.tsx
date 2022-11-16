import Head from "next/head";
import React, { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./Sidebar";

const Layout = ({ children, title }: { children: ReactNode; title: any }) => {
	return (
		<div className='flex'>
			<Head>
				<title>{title} - Aldierydotcom</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<SideBar />
			<div className='flex flex-col ml-16 w-full dark:bg-darkBG'>
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
