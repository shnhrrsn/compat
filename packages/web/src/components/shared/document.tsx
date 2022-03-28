import Breadcrumbs from '@/components/shared/breadcrumbs'
import ExternalLink from '@/components/shared/externalLink'
import Layout from '@/components/shared/layout'
import SafeHtml from '@/components/shared/safeHtml'
import Error404 from '@/pages/404'
import { Metadata } from '@compat/content'
import Contribute from './document/contribute'

export default function Document({ children, ...props }: Metadata & { children: any }) {
	if (!props.title) {
		return <Error404 />
	}

	const { links, content } = props
	const intro = content?.intro

	return (
		<Layout title={props.title} aside={<Breadcrumbs crumbs={props.self} />}>
			<article>
				<h1>{props.title}</h1>
				{intro && <SafeHtml ast={intro} />}
				{intro && links && (links.mdn || links.spec) && (
					<cite>
						{links.mdn && (
							<ExternalLink href={links.mdn}>Read More at MDN Docs</ExternalLink>
						)}
						{links.spec && <ExternalLink href={links.spec}>View Spec</ExternalLink>}
					</cite>
				)}
				{children}
				{content?.seeAlso && (
					<>
						<h3>See Also</h3>
						<SafeHtml ast={content.seeAlso} />
					</>
				)}
				{links && (
					<>
						<h3>Contribute</h3>
						<Contribute {...props} links={links} />
					</>
				)}
			</article>
		</Layout>
	)
}
