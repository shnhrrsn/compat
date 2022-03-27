import Breadcrumbs from '@/components/shared/breadcrumbs'
import Layout from '@/components/shared/layout'
import { ListingMetadata } from '@compat/content'
import Link from 'next/link'
import Error404 from './404'

export default function Listing({ title, links, self: ref }: ListingMetadata) {
	if (!title) {
		return <Error404 />
	}

	return (
		<Layout title={title} aside={<Breadcrumbs crumbs={ref} />}>
			<article>
				<h1>{title}</h1>
				<ul>
					{links.map(index => (
						<li key={index.href}>
							<Link href={index.href}>
								<a>{index.title}</a>
							</Link>
						</li>
					))}
				</ul>
			</article>
		</Layout>
	)
}
