import Breadcrumbs from '@/components/shared/breadcrumbs'
import Layout from '@/components/shared/layout'
import Link from 'next/link'
import Error404 from './404'

export type ListingProps = {
	title: string
	path: string[]
	pages: {
		title: string
		href: string
	}[]
}

export default function Listing({ title, pages, path }: ListingProps) {
	if (!title) {
		return <Error404 />
	}

	return (
		<Layout title={title} aside={<Breadcrumbs crumbs={path} />}>
			<article>
				<h1>{title}</h1>
				<ul>
					{pages.map(index => (
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
