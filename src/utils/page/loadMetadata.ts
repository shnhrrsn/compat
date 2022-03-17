import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import { URL } from 'url'
import { MdnCompat, PageMetadata } from '../getPage'
import { docs } from '../paths'

export async function loadMetadata(
	page: string[],
	compat: Exclude<MdnCompat['__compat'], undefined>,
): Promise<PageMetadata> {
	if (!compat.mdn_url) {
		return generateFallback(page, compat)
	}

	const mdnURL = new URL(compat.mdn_url)
	if (mdnURL.host !== 'developer.mozilla.org' || !mdnURL.pathname.startsWith('/docs/')) {
		throw new Error()
	}

	try {
		const md = await fs
			.readFile(path.join(docs, mdnURL.pathname.toLowerCase().substring(5), 'index.md'))
			.then(data => data.toString())
		const matter = parseMatter(md)

		return {
			title: (matter.data.title as string) ?? null,
			html: await renderMarkdown(matter.content),
		}
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return generateFallback(page, compat)
		}

		throw error
	}
}

function generateFallback(
	page: string[],
	compat: Exclude<MdnCompat['__compat'], undefined>,
): PageMetadata {
	return {
		title: page.slice(page.length - 2).join(' '),
		html: compat.description ?? null,
	}
}

function renderMarkdown(markdown: string) {
	return remark()
		.use(html)
		.process(
			markdown
				.replace(/^(\s*\{\{.+?\}\}\s*)+/g, '')
				.trim()
				.split(/\n\n/)[0],
		)
		.then(result => result.toString())
}
