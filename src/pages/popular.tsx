import Layout from '@/components/shared/layout'
import Link from 'next/link'

export default function Popular({ popular }: { popular: { href: string; title: string }[] }) {
	return (
		<Layout title="Popular">
			<h1>Top 250 Pages</h1>
			<ol>
				{popular.map(({ href, title }) => (
					<li key={href}>
						<Link href={href}>
							<a>{title ?? <code>{href}</code>}</a>
						</Link>
					</li>
				))}
			</ol>
		</Layout>
	)
}

export async function getStaticProps() {
	const popular = await import('@/public/@data/search-index.json').then(({ data }) =>
		data.slice(0, 250),
	)

	return { props: { popular } }
}
