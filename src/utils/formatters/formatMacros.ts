import escapeStringRegexp from 'escape-string-regexp'
import getAllPages from '../getAllPages'

type Parser = (...args: string[]) => RegExp
type TitleFormatter = (ref: string, title: string) => string

const parsers: Record<string, Parser> = {
	cssxref: parseCssxRef,
	domxref: parseDomxRef,
	event: parseEvent,
	htmlelement: parseHTMLElement,
	httpheader: parseHTTPHeader,
	httpstatus: parseHTTPStatus,
	jsxref: parseJsxRef,
}

const titleFormatters: Record<string, TitleFormatter> = {
	htmlelement: formatHTMLElementTitle,
}

export default async function formatMacros(content: string): Promise<string> {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	return content.replace(/\{\{\s*(\w+)\s*\((.+?)\)\s*\}\}/gi, (original, macro, rawParams) => {
		macro = macro.toLowerCase()
		const [ref, title, ...args] = Array.from(
			rawParams.matchAll(/(?:(?:(?:^|,\s*)(\d+)(?:$|\s*,))|(?:["'])(.+?)(?:["']))/g),
		).map(m => (m as string[])[1] ?? (m as string[])[2])

		if (macro === 'interwiki') {
			return formatInterwiki(ref, title, ...args) ?? original
		} else if (macro === 'glossary') {
			return formatGlossary(ref, title) ?? original
		}

		const parseHref = parsers[macro.toLowerCase()]

		if (!parseHref) {
			console.warn(`Unsupported macro: ${macro}`)
			return original
		}

		return formatRef(pages, parseHref, titleFormatters[macro], ref, title, ...args)
	})
}

function formatRef<
	T extends (...args: string[]) => RegExp,
	F extends (ref: string, title: string) => string,
>(
	pages: string[],
	parseHref: T,
	formatTitle: F | undefined | null,
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

	return `<a internal href="${href}">${content}</a>`
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
	const pathname = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/api\/.*${pathname.replace(/(\\\(\\\))/g, '(?:$1)?')}$`, 'i')
}

function parseEvent(ref: string) {
	const name = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/api\/.*${name}_event$`, 'i')
}

function parseHTTPHeader(ref: string) {
	const name = escapeStringRegexp(ref)
	return new RegExp(`^\/http\/headers\/.*${name}$`, 'i')
}

function formatHTMLElementTitle(ref: string, title: string) {
	if (title === ref && ref.indexOf(' ') === -1) {
		return `&lt;${title}&gt;`
	}

	return title
}

function parseHTTPStatus(ref: string) {
	return new RegExp(`^\/http\/status\/${ref}$`)
}

function formatInterwiki(ref: string, path: string, title?: string) {
	title = title ?? path

	switch (ref) {
		case 'wikipedia':
			return `<a href="https://en.wikipedia.org/wiki/${path}">${title}</a>`
		case 'wikimo':
			return `<a href="https://wiki.mozilla.org/${path}">${title}</a>`
		default:
			return null
	}
}

function formatGlossary(ref: string, title?: string) {
	title = title ?? ref
	return `<a href="/en-US/docs/Glossary/${ref.replace(/\s+/g, '_')}">${title}</a>`
}
