import type { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";
import Head from "next/head";

export async function getStaticProps() {
	return {
		props: {
			title: "Profile",
		},
	};
}

//
// MAIN BODY
//
const Profile: NextPageWithLayout = () => {
	return <div>HelloWorld</div>;
};

Profile.getLayout = function getLayout(page: ReactElement) {
	return <Layout title={page.props.title}>{page}</Layout>;
};

export default Profile;
