import { existsSync } from 'fs'
import path from 'path'
import { sourceUrl } from '../../config.js'
import loadFrontMatter from '../../markdown/loadFrontMatter.js'
import markdownToHtml from '../../markdown/markdownToHtml.js'
import parseMarkdown from '../../markdown/parseMarkdown.js'

/**
 * @param {import('./index.js').CommitInfo} commits
 * @param {string[]} ref
 * @param {URL | undefined} mdn
 * @param {number} fallbackTitleSegments
 */
export default async function generateMetadata(commits, ref, mdn, fallbackTitleSegments = 2) {
	const content = /** @type {import('../../../src/Metadata.js').Metadata} */ ({
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
