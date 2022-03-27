import Agents from '@/components/page/agents'
import Breakdown from '@/components/page/breakdown'
import Contribute from '@/components/page/contribute'
import SafeToUse from '@/components/page/safeToUse'
import Breadcrumbs from '@/components/shared/breadcrumbs'
import { DeprecatedCard, ExperimentalCard } from '@/components/shared/card'
import ExternalLink from '@/components/shared/externalLink'
import Layout from '@/components/shared/layout'
import SafeHtml from '@/components/shared/safeHtml'
import { PageMetadata } from '@compat/content'
import Error404 from './404'

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Page(props: PageMetadata) {
	if (!props?.title) {
		return <Error404 />
	}

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
