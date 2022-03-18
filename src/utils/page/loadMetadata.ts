import { CompatStatement } from '@mdn/browser-compat-data/types'
import execa from 'execa'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import formatExternalLinks from '../formatters/formatExternaLinks'
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
