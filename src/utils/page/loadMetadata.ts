import { CompatStatement } from '@mdn/browser-compat-data/types'
import execa from 'execa'
import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import { URL } from 'url'
import formatExternalLinks from '../formatters/formatExternaLinks'
import formatMacros from '../formatters/formatMacros'
import { PageMetadata } from '../getPage'
import { docs } from '../paths'

export default async function loadMetadata(
	page: string[],
	compat: CompatStatement,
): Promise<PageMetadata> {
	if (!compat.mdn_url) {
		return generateFallback(page, compat)
	}

	const mdnURL = new URL(compat.mdn_url)
	if (mdnURL.host !== 'developer.mozilla.org' || !mdnURL.pathname.startsWith('/docs/')) {
		throw new Error()
	}

	try {
		const dirname = mdnURL.pathname
			.toLowerCase()
			.substring(5)
			.replace(/\*/g, '_star_')
			.replace(/::/g, '_doublecolon_')
			.replace(/:/g, '_colon_')
			.replace(/\?/g, '_question_')

		const pathname = path.join(docs, dirname, 'index.md')
		const md = await fs.readFile(pathname).then(data => data.toString())
		const matter = parseMatter(md)

		let commit: string | null = null
		let lastModified: string | null = null

		try {
			;[commit, lastModified] = JSON.parse(
				(
					await execa(
						'git',
						[
							'--no-pager',
							'log',
							'-n',
							'1',
							'--pretty=["%H","%cI"]',
							'-s',
							path.relative(docs, pathname),
						],
						{ cwd: docs },
					)
				).stdout,
			)
		} catch (error) {
			console.error(error)
		}

		return {
			title: (matter.data.title as string) ?? null,
			html: await renderPageMarkdown(matter.content),
			commit,
			lastModified,
			urls: {
				folder: path.join('en-us', dirname),
				github: `https://github.com/mdn/content/blob/main/files/${path.join(
					'en-us',
					dirname,
					'index.md',
				)}`,
			},
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
		commit: null,
		lastModified: null,
		urls: {
			folder: null,
			github: null,
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
		.then(result => formatMacros(formatExternalLinks(result.toString())))
}
