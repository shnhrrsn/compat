import { CompatStatement } from '@mdn/browser-compat-data/types'
import crypto from 'crypto'
import execa from 'execa'
import path from 'path'
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import formatMacros from '../formatters/formatMacros'
import { PageMetadata } from '../getPage'
import { docs } from '../paths'
import generateFallbackTitle from './generateFallbackTitle'
import loadFrontMatter from './loadFrontMatter'
import resolveMdnUrl from './resolveMdnUrl'

export default async function loadMetadata(
	page: string[],
	compat: CompatStatement,
): Promise<PageMetadata> {
	if (!compat.mdn_url) {
		return generateFallback(page, compat)
	}

	const pathname = resolveMdnUrl(compat.mdn_url)
	const dirname = path.dirname(path.relative(docs, pathname))

	try {
		const matter = await loadFrontMatter({ pathname })

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
		title: generateFallbackTitle(page, compat),
		html: {
			intro: transformHtml(compat.description) ?? null,
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
		.replace(/^(\s*\{\{[\s\S]+?\}\}\s*)+/g, '')
		.trim()
		.split(/\n\n/)[0]
	const seeAlso = (markdown.match(/#\s*See\s+(?:also|more)\s+([\-\*][\s\S]+?)(\n#|$)/i) ??
		[])[1]?.trim()

	return Promise.all([transformMarkdown(intro), transformMarkdown(seeAlso)]).then(
		([intro, seeAlso]) => ({ intro, seeAlso }),
	)
}

function transformMarkdown(markdown?: string | null) {
	if (!markdown) {
		return null
	}

	return unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeRaw)
		.use(rehypeStringify)
		.process(markdown)
		.then(result => formatMacros(result.toString()))
		.then(transformHtml)
}

function transformHtml(html?: string | null) {
	if (!html) {
		return null
	}

	return {
		id: crypto.createHash('md5').update(html).digest('hex'),
		tree: removePosition(unified().use(rehypeParse, { fragment: true }).parse(html), true),
	}
}
