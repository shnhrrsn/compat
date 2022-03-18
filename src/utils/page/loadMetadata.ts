import { CompatStatement } from '@mdn/browser-compat-data/types'
import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import { URL } from 'url'
import formatMacros from '../formatters/formatMacros'
import { PageMetadata } from '../getPage'
import { docs } from '../paths'

export async function loadMetadata(page: string[], compat: CompatStatement): Promise<PageMetadata> {
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
			html: await renderPageMarkdown(matter.content),
		}
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return generateFallback(page, compat)
		}

		throw error
	}
}

function generateFallback(page: string[], compat: CompatStatement): PageMetadata {
	return {
		title: page.slice(page.length - 2).join(' '),
		html: {
			intro: compat.description ?? null,
			seeAlso: null,
		},
	}
}

function renderPageMarkdown(markdown: string) {
	const intro = markdown
		.replace(/^(\s*\{\{.+?\}\}\s*)+/g, '')
		.trim()
		.split(/\n\n/)[0]
	const seeAlso = (markdown.match(/#\s*See\s+(?:also|more)\s+([\-\*][\s\S]+?)(\n#|$)/i) ??
		[])[1]?.trim()

	return Promise.all([renderMarkdown(intro), renderMarkdown(seeAlso)]).then(
		([intro, seeAlso]) => ({ intro, seeAlso }),
	)
}

function renderMarkdown(markdown?: string | null) {
	if (!markdown) {
		return null
	}

	return remark()
		.use(html)
		.process(markdown)
		.then(result =>
			formatMacros(
				result
					.toString()
					.replace(/\<a\s/g, '<a target="_blank" rel="noopener noreferrer" '),
			),
		)
}
