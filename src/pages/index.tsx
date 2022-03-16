import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function Index() {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			TODO
		</Layout>
	)
}
