import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";

export async function getStaticProps() {
	return {
		props: {
			title: "Hello",
		},
	};
}

const Home: NextPageWithLayout = () => {
	return <div>Hello Hello Hello!</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	console.log(page);
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Home;
