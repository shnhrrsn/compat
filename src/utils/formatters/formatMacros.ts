import escapeStringRegexp from 'escape-string-regexp'
import getAllPages from '../getAllPages'

export default async function formatMacros(content: string): Promise<string> {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	return content.replace(
		/\{\{jsxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
		formatJsxRef.bind(null, pages),
	)
}

function formatJsxRef(pages: string[], _: string, ref: string, title?: string): string {
	title = title && title.length === 0 ? undefined : title
	const pathname = escapeStringRegexp(
		ref
			.replace(/\(\)/g, '')
			.replace(/\/.prototype\./g, '.')
			.replace(/\./g, '/'),
	)
	const pattern = new RegExp(`^\/javascript\/.+?\/${pathname}$`, 'i')
	const href = pages.find(page => pattern.test(page))
	const content = `<code>${title ?? ref}</code>`

	if (!href) {
		console.warn(`Could not find path for jsxref: ${ref}`)
		return content
	}

	return `<a href="${href}">${content}</a>`
}
