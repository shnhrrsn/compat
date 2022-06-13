import compatData from '@mdn/browser-compat-data' assert { type: 'json' }
import path from 'path'
import generateListing from './generateListing.js'
import generatePage from './generatePage.js'

/**
 *
 * @typedef {import('../../../src/Metadata').Metadata} Metadata
 * @typedef {import('../../../src/Metadata').PageMetadata} PageMetadata
 * @typedef {import('../../../src/Metadata').ListingMetadata} ListingMetadata
 * @typedef {import('../../../src/Manifest').ManifestEntry} ManifestEntry
 * @typedef {import('type-fest').AsyncReturnType<import('../commitInfo.js').default>} CommitInfo
 * @typedef {import('type-fest').AsyncReturnType<import('../sitemap.js').default>} Sitemap
 */

/**
 * @param {CommitInfo} commits
 * @param {Sitemap} sitemap
 * @param {import('ora').Ora} spinner
 * @param {import('../../utils/progress').Progress} progress
 * @returns
 */
export default function generate(commits, sitemap, spinner, progress) {
	return walk(commits, sitemap, compatData, [], progress)
}

/**
 *
 * @param {CommitInfo} commits
 * @param {Sitemap} sitemap
 * @param {any} object
 * @param {string[]} tree
 * @param {import('../../utils/progress').Progress} progress
 * @returns {Promise<ManifestEntry[]>}
 */
async function walk(commits, sitemap, object, tree, progress) {
	const pages = /** @type {ManifestEntry[]} */ ([])
	const keys = Object.getOwnPropertyNames(object)
	progress.total += keys.length

	for (const key of keys) {
		try {
			if (key === '__compat') {
				continue
			}

			const value = object[key]

			if (typeof value !== 'object' || Array.isArray(value) || value === null) {
				continue
			}

			const ref = [...tree, key]

			/**
			 * @template {PageMetadata | ListingMetadata} T
			 * @param {T} page
			 * @returns {T}
			 */
			const pushPage = page => {
				pages.push({
					type: page.type,
					href: path.join('/', ...page.self),
					title: page.title,
					mdn: page.links?.mdn,
					...(page.type === 'page' ? { commit: page.commit } : {}),
				})
				return page
			}

			const [children] = await Promise.all([
				walk(commits, sitemap, value, ref, progress).then(subpages => {
					pages.push(...subpages)
					return subpages
				}),
				value.__compat
					? generatePage(commits, sitemap, ref, value.__compat).then(pushPage)
					: undefined,
			])

			if (!value.__compat) {
				pushPage(await generateListing(commits, sitemap, ref, Object.keys(value), children))
			}
		} finally {
			progress.completed++
		}
	}

	return pages
}
