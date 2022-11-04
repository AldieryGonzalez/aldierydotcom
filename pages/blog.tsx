import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import Head from "next/head";

export async function getStaticProps() {
	return {
		props: {
			title: "Blog",
		},
	};
}

//
// MAIN BODY
//
const Blog: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Blog.getLayout = function getLayout(page: ReactElement) {
	console.log(page);
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Blog;
