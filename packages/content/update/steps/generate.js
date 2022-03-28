import compatData from '@mdn/browser-compat-data'
import { existsSync } from 'fs'
import path from 'path'
import { sourceUrl } from '../config.js'
import loadFrontMatter from '../markdown/loadFrontMatter.js'
import markdownToHtml from '../markdown/markdownToHtml.js'
import parseMarkdown from '../markdown/parseMarkdown.js'
import generateSupport from '../utils/generateSupport.js'
import outputUrlForRef from '../utils/outputUrlForRef.js'
import resolveMdnUrl from '../utils/resolveMdnUrl.js'
import writeJSON from '../utils/writeJSON.js'

/**
 *
 * @typedef {import('../../src/Metadata').Metadata} Metadata
 * @typedef {import('../../src/Metadata').PageMetadata} PageMetadata
 * @typedef {import('../../src/Metadata').ListingMetadata} ListingMetadata
 * @typedef {import('../../src/Manifest').ManifestEntry} ManifestEntry
 * @typedef {import('type-fest').AsyncReturnType<import('./commitInfo.js').default>} CommitInfo
 * @typedef {import('type-fest').AsyncReturnType<import('./sitemap.js').default>} Sitemap
 */

/**
 * @param {CommitInfo} commits
 * @param {Sitemap} sitemap
 * @param {import('ora').Ora} spinner
 * @param {import('../utils/progress').Progress} progress
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
 * @param {import('../utils/progress').Progress} progress
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
			 * @param {PageMetadata | ListingMetadata} page
			 */
			const pushPage = page => {
				pages.push({
					type: page.type,
					href: path.join('/', ...page.self),
					title: page.title,
					mdn: page.links?.mdn,
					...(page.type === 'page' ? { commit: page.commit } : {}),
				})
			}

			await Promise.all([
				walk(commits, sitemap, value, ref, progress).then(subpages =>
					pages.push(...subpages),
				),
				value.__compat &&
					generatePage(commits, sitemap, ref, value.__compat).then(pushPage),
				!value.__compat &&
					generateListing(commits, sitemap, ref, Object.keys(value)).then(pushPage),
			])
		} finally {
			progress.completed++
		}
	}

	return pages
}

/**
 * @param {CommitInfo} commits
 * @param {Sitemap} sitemap
 * @param {string[]} ref
 * @param {import('@mdn/browser-compat-data/types').CompatStatement} compat
 */
async function generatePage(commits, sitemap, ref, compat) {
	const support = generateSupport(compat)
	const mdn = resolveMdnUrl(compat.mdn_url)
	const metadata = await generateMetadata(commits, ref, mdn)
	const content = /** @type {PageMetadata} */ ({
		...metadata,
		type: 'page',
		links: {
			...(metadata.links ?? {}),
			mdn: compat.mdn_url ?? undefined,
			spec: /** @type {any} */ (compat).spec_url ?? undefined,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support: support,
		status: compat.status,
	})

	await writeJSON(outputUrlForRef(ref), content)
	return content
}

/**
 * @param {CommitInfo} commits
 * @param {Sitemap} sitemap
 * @param {string[]} ref
 * @param {string[]} contents
 */
async function generateListing(commits, sitemap, ref, contents) {
	const mdn = sitemap.get(ref.join('.'))
	const metadata = await generateMetadata(
		commits,
		ref,
		mdn ? new URL(mdn, sourceUrl) : undefined,
		1,
	)
	const content = /** @type {ListingMetadata} */ ({
		...metadata,
		type: 'listing',
		children: contents.map(key => ({ title: key, href: path.join('/', ...ref, key) })),
	})

	await writeJSON(outputUrlForRef(ref), content)
	return content
}

/**
 * @param {CommitInfo} commits
 * @param {string[]} ref
 * @param {URL | undefined} mdn
 * @param {number} fallbackTitleSegments
 */
async function generateMetadata(commits, ref, mdn, fallbackTitleSegments = 2) {
	const content = /** @type {Metadata} */ ({
		self: ref,
		type: undefined,
		title: ref.slice(ref.length - fallbackTitleSegments).join(' / '),
	})

	if (!mdn || !existsSync(mdn)) {
		return content
	}

	content.links = {
		mdn: undefined,
		spec: undefined,
		github: undefined,
	}

	content.content = {
		intro: undefined,
		seeAlso: undefined,
	}

	const { data, content: md } = await loadFrontMatter(mdn)

	const pathname = path.relative(sourceUrl.pathname, mdn.pathname)
	content.commit = commits.get(pathname)
	content.links.github = `https://github.com/mdn/content/blob/main/${pathname}`

	if (data.slug) {
		content.links.mdn = `https://developer.mozilla.org/docs/${data.slug}`
	}

	if (data.title) {
		content.title = data.title
	}

	const ast = await parseMarkdown(md?.replace(/^(\s*\{\{[\s\S]+?\}\}\s*)+/g, ''))
	if (!ast) {
		return content
	}

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

	return content
}
