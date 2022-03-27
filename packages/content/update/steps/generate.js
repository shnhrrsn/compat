import compatData from '@mdn/browser-compat-data'
import { existsSync } from 'fs'
import path from 'path'
import { sourceUrl } from '../config.js'
import loadFrontMatter from '../markdown/loadFrontMatter.js'
import markdownToHtml from '../markdown/markdownToHtml.js'
import parseMarkdown from '../markdown/parseMarkdown.js'
import generateFallbackTitle from '../utils/generateFallbackTitle.js'
import generateSupport from '../utils/generateSupport.js'
import outputUrlForRef from '../utils/outputUrlForRef.js'
import resolveMdnUrl from '../utils/resolveMdnUrl.js'
import writeJSON from '../utils/writeJSON.js'

/**
 *
 * @typedef {import('../../src/Page').PageMetadata} PageMetadata
 * @typedef {import('../../src/Listing').ListingMetadata} ListingMetadata
 * @typedef {import('../../src/Manifest').ManifestEntry} ManifestEntry
 * @typedef {Map<string, { sha: string, date: string }>} CommitInfo
 */

/**
 * @param {CommitInfo} commits
 * @param {import('ora').Ora} spinner
 * @param {import('../utils/progress').Progress} progress
 * @returns
 */
export default function generate(commits, spinner, progress) {
	return walk(commits, compatData, [], progress)
}

/**
 *
 * @param {CommitInfo} commits
 * @param {any} object
 * @param {string[]} tree
 * @param {import('../utils/progress').Progress} progress
 * @returns {Promise<ManifestEntry[]>}
 */
async function walk(commits, object, tree, progress) {
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
			 * @param {PageMetadata | ListingMetadata} page
			 */
			const pushPage = page => {
				pages.push({
					type: page.type,
					href: path.join('/', ...page.self),
					title: page.title,
					...(page.type === 'page' ? { commit: page.commit } : {}),
				})
			}

			await Promise.all([
				walk(commits, value, ref, progress).then(subpages => pages.push(...subpages)),
				value.__compat && generatePage(commits, ref, value.__compat).then(pushPage),
				!value.__compat && generateListing(commits, ref, Object.keys(value)).then(pushPage),
			])
		} finally {
			progress.completed++
		}
	}

	return pages
}

/**
 * @param {CommitInfo} commits
 * @param {string[]} ref
 * @param {import('@mdn/browser-compat-data/types').CompatStatement} compat
 */
async function generatePage(commits, ref, compat) {
	const support = generateSupport(compat)
	const content = /** @type {PageMetadata} */ ({
		self: ref,
		type: 'page',
		commit: undefined,
		title: generateFallbackTitle(ref, compat),
		links: {
			mdn: compat.mdn_url ?? undefined,
			spec: /** @type {any} */ (compat).spec_url ?? undefined,
			github: undefined,
		},
		content: {
			intro: undefined,
			seeAlso: undefined,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support: support,
		status: compat.status,
	})

	const mdn = resolveMdnUrl(content.links.mdn)

	if (mdn && existsSync(mdn)) {
		const pathname = path.relative(sourceUrl.pathname, mdn.pathname)
		content.commit = commits.get(pathname)
		content.links.github = `https://github.com/mdn/content/blob/main/${pathname}`

		const { data, content: md } = await loadFrontMatter(mdn)

		if (data.title) {
			content.title = data.title
		}

		const ast = await parseMarkdown(md?.replace(/^(\s*\{\{[\s\S]+?\}\}\s*)+/g, ''))
		if (ast) {
			content.content.intro = await markdownToHtml(
				ast.children.find(child => child.type === 'paragraph'),
			)

			const seeAlso = ast.children.findIndex(
				child =>
					child.type === 'heading' &&
					/\s*see\s+(more|also)/i.test(/** @type {any} */ (child.children?.[0])?.value),
			)

			content.content.seeAlso = await markdownToHtml(
				seeAlso >= 0 && ast.children.slice(seeAlso).find(child => child.type === 'list'),
			)
		}
	}

	await writeJSON(outputUrlForRef(ref), content)
	return content
}
/**
 * @param {CommitInfo} commits
 * @param {string[]} ref
 * @param {string[]} contents
 */
async function generateListing(commits, ref, contents) {
	const content = /** @type {ListingMetadata} */ ({
		self: ref,
		type: 'listing',
		title: ref[ref.length - 1],
		links: contents.map(key => ({ title: key, href: path.join('/', ...ref, key) })),
	})

	await writeJSON(outputUrlForRef(ref), content)
	return content
}
