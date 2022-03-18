import escapeStringRegexp from 'escape-string-regexp'
import getAllPages from '../getAllPages'

export default async function formatMacros(content: string): Promise<string> {
	const pages = await getAllPages()
	return content.replace(
		/\{\{jsxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/g,
		formatJsxRef.bind(null, pages),
	)
}

function formatJsxRef(pages: string[], _: string, ref: string, title?: string): string {
	const pathname = escapeStringRegexp(
		ref.replace('()', '').replace('.prototype.', '.').replace(/\./g, '/'),
	)
	const pattern = new RegExp(`^\/javascript\/.+?${pathname}$`, 'i')
	const href = pages.find(page => pattern.test(page))
	const content = `<code>${ref ?? title}</code>`

	if (!href) {
		console.warn(`Could not find path for jsxref: ${ref}`)
		return content
	}

	return `<a href="${href}">${content}</a>`
}
