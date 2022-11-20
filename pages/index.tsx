import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";

export async function getStaticProps() {
	return {
		props: {
			title: "Home",
		},
	};
}

//
// MAIN BODY
//
const Home: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Home;
