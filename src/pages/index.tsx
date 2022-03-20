import Search from '@/components/search/search'
import Layout from '@/components/shared/layout'
import getRecents from '@/utils/getRecents'
import compatData from '@mdn/browser-compat-data'
import Link from 'next/link'
import styles from './index.module.css'

type PageRef = { href: string; title: string }

export default function Index({
	recent,
	popular,
	sections,
}: {
	recent: PageRef[]
	popular: PageRef[]
	sections: PageRef[]
}) {
	return (
		<Layout excludeSearch>
			<Search autoFocus />
			<div className={styles.sections}>
				<Section title="Popular" pages={popular} tag="ol" />
				<Section title="Recently Updated" pages={recent} />
				<Section title="Sections" pages={sections} />
			</div>
		</Layout>
	)
}

function Section({ title, pages, tag }: { title: string; pages: PageRef[]; tag?: 'ol' | 'ul' }) {
	const List = (tag ?? 'ul') as any
	return (
		<div className={styles.section}>
			<h4>{title}</h4>
			<List className={styles.list}>
				{pages.map(({ href, title }) => (
					<li key={href}>
						<Link href={href}>
							<a className={styles.item}>{title ?? <code>{href}</code>}</a>
						</Link>
					</li>
				))}
			</List>
		</div>
	)
}

export async function getStaticProps() {
	const popular = await import('@/public/@data/search-index.json').then(({ data }) =>
		data.slice(0, 15),
	)

	const sections = Object.keys(compatData)
		.filter(key => key !== 'browsers')
		.map(key => ({ title: key, href: key }))

	return {
		props: {
			recent: (await getRecents()).slice(0, 15),
			popular,
			sections,
		},
	}
}
