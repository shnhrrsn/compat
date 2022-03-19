import getAllPages from '../getAllPages'
import * as macros from '../macros'

type Parser = (...args: string[]) => RegExp
type TitleFormatter = (ref: string, title: string) => string
type Transformer = (ref: string, ...args: string[]) => string | undefined | null

const $macros: Record<
	string,
	{ parse: Parser; formatTitle?: TitleFormatter } | { transform: Transformer }
> = macros

export default async function formatMacros(content: string): Promise<string> {
	const pages = (await getAllPages()).sort((lhs, rhs) => lhs.length - rhs.length)
	return content.replace(/\{\{\s*(\w+)\s*\((.+?)\)\s*\}\}/gi, (original, macro, rawParams) => {
		macro = macro.toLowerCase()
		const [ref, title, ...args] = Array.from(
			rawParams.matchAll(/(?:(?:(?:^|,\s*)(\d+)(?:$|\s*,))|(?:["'])(.+?)(?:["']))/g),
		).map(m => (m as string[])[1] ?? (m as string[])[2])
		const $macro = $macros[macro.toLowerCase()]

		if (!$macro) {
			console.warn(`Unsupported macro: ${macro}`)
			return original
		}

		if ('transform' in $macro) {
			return $macro.transform(ref, title, ...args) ?? original
		}

		return formatRef(pages, $macro.parse, $macro.formatTitle, ref, title, ...args)
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
		// console.warn(`Could not find path for: ${ref}`, pattern)
		return content
	}

	return `<a internal href="${href}">${content}</a>`
}
