import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import Head from "next/head";

export async function getStaticProps() {
	return {
		props: {
			title: "Settings",
		},
	};
}

//
// MAIN BODY
//
const Settings: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Settings.getLayout = function getLayout(page: ReactElement) {
	console.log(page);
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Settings;
