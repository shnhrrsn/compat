import Agents from '@/components/page/agents'
import Breakdown from '@/components/page/breakdown'
import Contribute from '@/components/page/contribute'
import SafeToUse from '@/components/page/safeToUse'
import Breadcrumbs from '@/components/shared/breadcrumbs'
import { DeprecatedCard, ExperimentalCard } from '@/components/shared/card'
import ExternalLink from '@/components/shared/externalLink'
import Layout from '@/components/shared/layout'
import SafeHtml from '@/components/shared/safeHtml'
import { PageMetadata, PageSupport } from '@/utils/getPage'
import { StatusBlock } from '@mdn/browser-compat-data/types'
import Error404 from './404'

export type PageProps = Omit<PageMetadata, 'urls'> & {
	section:
		| 'api'
		| 'css'
		| 'html'
		| 'http'
		| 'javascript'
		| 'mathml'
		| 'svg'
		| 'webdriver'
		| 'webextensions'
	path: string[]
	query: string
	urls: PageMetadata['urls'] & {
		mdn: string | null
		spec: string | null
	}
	usage: number
	support: Record<string, PageSupport>
	status: StatusBlock | null
}

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Page(props: PageProps) {
	if (!props?.title) {
		return <Error404 />
	}

	return (
		<Layout title={props.title} aside={<Breadcrumbs crumbs={props.path} />}>
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
