import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function Index() {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<h1>404</h1>
			<p>Page Not Found</p>
		</Layout>
	)
}
