import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import Head from "next/head";

export async function getStaticProps() {
	return {
		props: {
			title: "Projects",
		},
	};
}

//
// MAIN BODY
//
const Projects: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Projects.getLayout = function getLayout(page: ReactElement) {
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Projects;
