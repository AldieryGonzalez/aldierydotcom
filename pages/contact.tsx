import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import Head from "next/head";

export async function getStaticProps() {
	return {
		props: {
			title: "Contact Me",
		},
	};
}

//
// MAIN BODY
//
const Contact: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Contact.getLayout = function getLayout(page: ReactElement) {
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Contact;
