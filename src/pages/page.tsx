import Agents from '@/components/page/agents'
import Breakdown from '@/components/page/breakdown'
import Contribute from '@/components/page/contribute'
import SafeToUse from '@/components/page/safeToUse'
import Breadcrumbs from '@/components/shared/breadcrumbs'
import { DeprecatedCard, ExperimentalCard } from '@/components/shared/card'
import ExternalLink from '@/components/shared/externalLink'
import Layout from '@/components/shared/layout'
import SafeHtml, { SafeHtmlAst } from '@/components/shared/safeHtml'
import { StatusBlock } from '@mdn/browser-compat-data/types'
import { PageSupport } from '../types/Page'
import Error404 from './404'

export type PageProps = {
	self: string[]
	type: 'page'
	commit?: {
		date: string
		sha: string
	}
	title: string
	links: {
		mdn?: string
		spec?: string
		github?: string
	}
	content: {
		intro?: SafeHtmlAst
		seeAlso?: SafeHtmlAst
	}
	usage: number
	support: Record<string, PageSupport>
	status?: StatusBlock
}

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Page(props: PageProps) {
	if (!props?.title) {
		return <Error404 />
	}

	console.log(props)

	return (
		<Layout title={props.title} aside={<Breadcrumbs crumbs={props.self} />}>
			<article>
				<h1>{props.title}</h1>
				{props.content.intro && <SafeHtml ast={props.content.intro} />}
				{(props.links.mdn || props.links.spec) && (
					<cite>
						{props.links.mdn && (
							<ExternalLink href={props.links.mdn}>
								Read More at MDN Docs
							</ExternalLink>
						)}
						{props.links.spec && (
							<ExternalLink href={props.links.spec}>View Spec</ExternalLink>
						)}
					</cite>
				)}
				<h3>Safe to Use</h3>
				{props.status?.experimental && <ExperimentalCard />}
				{props.status?.deprecated && <DeprecatedCard />}
				<SafeToUse title={props.title} usage={props.usage} />
				<h3>Browsers</h3>
				<Agents agents={browsers} support={props.support} />
				{props.self[0] === 'javascript' && (
					<>
						<h3>Servers</h3>
						<Agents agents={servers} support={props.support} />
					</>
				)}
				<h3>Version Breakdown</h3>
				<Breakdown support={props.support} />
				{props.content.seeAlso && (
					<>
						<h3>See Also</h3>
						<SafeHtml ast={props.content.seeAlso} />
					</>
				)}
				<h3>Contribute</h3>
				<Contribute {...props} />
			</article>
		</Layout>
	)
}
