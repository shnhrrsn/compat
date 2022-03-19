import Agents from '@/components/page/agents'
import Breakdown from '@/components/page/breakdown'
import Contribute from '@/components/page/contribute'
import SafeToUse from '@/components/page/safeToUse'
import { DeprecatedCard, ExperimentalCard } from '@/components/shared/card'
import ExternalLink from '@/components/shared/externalLink'
import Layout, { siteTitle } from '@/components/shared/layout'
import getAllPages from '@/utils/getAllPages'
import getPage, { Page } from '@/utils/getPage'
import Head from 'next/head'
import SafeHtml from '../components/shared/safeHtml'

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Home(props: Page) {
	return (
		<Layout>
			<Head>
				<title>
					{props.title} | {siteTitle}
				</title>
			</Head>

			<article>
				<h1>{props.title}</h1>
				{props.html.intro && <SafeHtml ast={props.html.intro} />}
				{(props.urls.mdn || props.urls.spec) && (
					<cite>
						{props.urls.mdn && (
							<ExternalLink href={props.urls.mdn}>Read More at MDN Docs</ExternalLink>
						)}
						{props.urls.spec && (
							<ExternalLink href={props.urls.spec}>View Spec</ExternalLink>
						)}
					</cite>
				)}
				<h3>Safe to Use</h3>
				{props.status?.experimental && <ExperimentalCard />}
				{props.status?.deprecated && <DeprecatedCard />}
				<SafeToUse title={props.title} usage={props.usage} />
				<h3>Browsers</h3>
				<Agents agents={browsers} support={props.support} />
				{props.section === 'javascript' && (
					<>
						<h3>Servers</h3>
						<Agents agents={servers} support={props.support} />
					</>
				)}
				<h3>Version Breakdown</h3>
				<Breakdown support={props.support} />
				{props.html.seeAlso && (
					<>
						<h3>See Also</h3>
						<SafeHtml ast={props.html.seeAlso} />
					</>
				)}
				<h3>Contribute</h3>
				<Contribute {...props} />
			</article>
		</Layout>
	)
}

export async function getStaticPaths() {
	return {
		paths: await getAllPages(),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: await getPage(params.page),
	}
}
