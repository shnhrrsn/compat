import assert from 'assert'
import escapeStringRegexp from 'escape-string-regexp'
import { cached } from './cache'
import getAllPages from './getAllPages'
import maybeMap from './maybeMap'
import generateFallbackTitle from './page/generateFallbackTitle'
import loadCompat from './page/loadCompat'
import loadFrontMatter from './page/loadFrontMatter'
import { reduceUnique } from './unique'

export default async function getRecents() {
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

		// Remove any duplicates
		.reduce(reduceUnique(), [])

		// Grab the first 25
		.slice(0, 25)

		// Get page title
		.map(async (href: string) => {
			const page = href.substring(1).split(/\//)
			const compat = await loadCompat(href.substring(1).split(/\//))
			const title = await loadFrontMatter({ compat })
				.then(({ data }) => data.title)
				.catch(error => {
					if (error.code !== 'ENOENT') {
						throw error
					}

					return generateFallbackTitle(page, compat)
				})

			assert(typeof title === 'string')

			return { href, title }
		})

	const popular = await import('@/public/@data/search-index.json').then(({ data }) =>
		data.slice(0, 25),
	)

	return Promise.all(recent)
}

async function getCompare() {
	return cached('compare', 5 * 60 * 1_000, () =>
		fetch('https://api.github.com/repos/mdn/browser-compat-data/compare/main~50...main').then(
			result => {
				if (!result.ok) {
					throw new Error(`Failed: ${result.status}`)
				}

				return result.json()
			},
		),
	).then(compare => JSON.parse(JSON.stringify(compare)))
}
