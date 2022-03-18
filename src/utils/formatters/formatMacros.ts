import escapeStringRegexp from 'escape-string-regexp'
import getAllPages from '../getAllPages'

export default async function formatMacros(content: string): Promise<string> {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	return content
		.replace(
			/\{\{jsxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseJsxRef),
		)
		.replace(
			/\{\{cssxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseCssxRef),
		)
}

function formatRef<T extends (...args: string[]) => RegExp>(
	pages: string[],
	parseHref: T,
	_: string,
	ref: string,
	title?: string,
	...args: string[]
): string {
	const content = `<code>${(title && title.length === 0 ? undefined : title) ?? ref}</code>`
	const pattern = parseHref(ref, ...args)
	const href = pages.find(page => pattern.test(page))

	if (!href) {
		console.warn(`Could not find path for: ${ref}`)
		return content
	}

	return `<a href="${href}">${content}</a>`
}

function parseJsxRef(ref: string) {
	const pathname = escapeStringRegexp(
		ref
			.replace(/\(\)/g, '')
			.replace(/\.prototype\./g, '.')
			.replace(/\./g, '/'),
	)
	return new RegExp(`^\/javascript\/.+?\/${pathname}$`, 'i')
}

function parseCssxRef(ref: string, params?: string) {
	const pathname = escapeStringRegexp(
		ref
			.replace(/&lt;(color|flex|position)&gt;/g, '$1_value')
			.replace(/&lt;(.*)&gt;/g, '$1')
			.replace(/<(.*)>/g, '$1')
			.replace(/\(\)/g, ''),
	)
	return new RegExp(`^\/css\/properties.*\/${pathname}$`, 'i')
}
