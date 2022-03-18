import escapeStringRegexp from 'escape-string-regexp'
import getAllPages from '../getAllPages'

export default async function formatMacros(content: string): Promise<string> {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	return content
		.replace(
			/\{\{jsxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseJsxRef, null),
		)
		.replace(
			/\{\{cssxref\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseCssxRef, null),
		)
		.replace(
			/\{\{HTMLElement\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseHTMLElement, formatHTMLElementTitle),
		)
		.replace(
			/\{\{DOMxRef\(\s*"(.+?)"(?:,\s*"(.+?)")?\s*\)\}\}/gi,
			formatRef.bind(null, pages, parseDomxRef, null),
		)
}

function formatRef<
	T extends (...args: string[]) => RegExp,
	F extends (ref: string, title: string) => string,
>(
	pages: string[],
	parseHref: T,
	formatTitle: F | undefined | null,
	_: string,
	ref: string,
	title?: string,
	...args: string[]
): string {
	title = (title && title.length === 0 ? undefined : title) ?? ref
	title = formatTitle ? formatTitle(ref, title) : title
	const content = `<code>${title}</code>`
	const pattern = parseHref(ref, ...args)
	const href = pages.find(page => pattern.test(page))

	if (!href) {
		console.warn(`Could not find path for: ${ref}`, pattern)
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

function parseHTMLElement(ref: string) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/html\/elements.*\/${pathname}$`, 'i')
}

function parseDomxRef(ref: string) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/api\/.*${pathname}$`, 'i')
}

function formatHTMLElementTitle(ref: string, title: string) {
	if (title === ref && ref.indexOf(' ') === -1) {
		return `&lt;${title}&gt;`
	}

	return title
}
