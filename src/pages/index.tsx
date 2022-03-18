import Layout, { siteTitle } from '@/components/shared/layout'
import cache from '@/utils/cache'
import getAllPages from '@/utils/getAllPages'
import getPage from '@/utils/getPage'
import maybeMap from '@/utils/maybeMap'
import escapeStringRegexp from 'escape-string-regexp'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'node-fetch'

export default function Index({ recent }: { recent: { href: string; title: string }[] }) {
	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<h3>TODO</h3>
			<ul>
				<li>Search</li>
			</ul>
			<h3>Recently Updated</h3>
			<ul>
				{recent.map(({ href, title }) => (
					<li key={href}>
						<Link href={href}>
							<a>{title ?? <code>{href}</code>}</a>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	const compare = await getCompare()

	// Map commit sha to date
	const commits = new Map(
		compare.commits.map((commit: any) => [
			commit.sha,
			maybeMap(
				commit.commit?.committer?.date ?? commit.commit?.author?.date,
				(date: any) => new Date(date),
			),
		]),
	)

	const recent = (compare.files as any[])
		// Filter out any removed files + non-json files
		.filter(
			({ filename, status }: any) =>
				status !== 'removed' && filename.includes('/') && filename.endsWith('.json'),
		)

		// Get date of change + path pattern
		.map((file: any) => {
			const date = commits.get(new URL(file.contents_url).searchParams.get('ref')) as Date
			const patch: string = file.patch.replace(/^\-.*$/gm, '').replace(/^\+/gm, ' ')
			const keys = Array.from(patch.matchAll(/"([^"]+?)":\s*\{\s*"__compat"/gm)).map(
				([, key]) => key,
			)
			const patterns = keys.map(
				(key: string) =>
					new RegExp(
						`^\/${escapeStringRegexp(
							file.filename.substring(0, file.filename.length - 5),
						)}.*${escapeStringRegexp(key)}$`,
						'i',
					),
			)

			return { date, patterns }
		})

		// Filter out missing dates
		.filter(({ date }) => date && date instanceof Date)

		// Sort by most recent
		.sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime())

		// Map to patterns
		.map(({ patterns }) => patterns)

		// Flatten array of array of patterns
		.flat()

		// Match to page
		.map((pattern: RegExp) => pages.find(page => pattern.test(page)))

		// Filter out failed matches
		.filter((page: any): page is string => typeof page === 'string')

		// Grab the first 25
		.slice(0, 25)

		// Get page title
		.map(async (href: string) => {
			const { title } = await getPage(href.substring(1).split(/\//))
			return { href, title }
		})

	return {
		props: {
			recent: await Promise.all(recent),
		},
	}
}

async function getCompare() {
	return cache
		.get('compare')
		.then(async (compare: any) => {
			if (compare) {
				return compare
			}

			compare = await fetch(
				'https://api.github.com/repos/mdn/browser-compat-data/compare/main~50...main',
			).then(result => {
				if (!result.ok) {
					throw new Error(`Failed: ${result.status}`)
				}

				return result.json()
			})

			cache.set('compare', compare, 5 * 60 * 1_000)
			return compare
		})
		.then(compare => JSON.parse(JSON.stringify(compare)))
}
