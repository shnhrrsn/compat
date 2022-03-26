import compatData from '@mdn/browser-compat-data'
import { cached } from '../cache.js'
import * as macros from '../macros/index.js'

/**
 * @typedef {(...args: string[]) => RegExp} Parser
 * @typedef {(ref: string, title: string) => string} TitleFormatter
 * @typedef {(ref: string, ...args: string[]) => string | undefined | null} Transformer
 * @typedef {() => string | undefined | null} Expand
 */

/**
 @type {Record<
	string,
	| { parse: Parser; formatTitle?: TitleFormatter }
	| { transform: Transformer }
	| { expand: Expand }
 >}
 */
const $macros = macros

/**
 * @param {string} content
 * @returns {Promise<string>}
 */
export default async function formatMacros(content) {
	const pages = await getAllPages()
	return content.replace(
		/\{\{\s*([\w\-]+)(?:\s*\((.+?)\))?\s*\}\}/gi,
		(original, macro, rawParams) => {
			macro = macro.toLowerCase().replace(/[^a-z]/g, '')
			const $macro = $macros[macro.toLowerCase()]

			if (!$macro) {
				console.warn(`Unsupported macro: ${macro}`)
				return original
			}

			if (!rawParams) {
				if ('expand' in $macro) {
					return $macro.expand() ?? original
				}

				console.warn(`Missing expand macro: ${macro}`)
				return original
			}

			const [ref, title, ...args] = Array.from(
				rawParams.matchAll(/(?:(?:(?:^|,\s*)(\d+)(?:$|\s*,))|(?:["'])(.+?)(?:["']))/g),
			).map(m => m[1] ?? m[2])

			if ('transform' in $macro) {
				return $macro.transform(ref, title, ...args) ?? original
			} else if (!('parse' in $macro)) {
				console.warn(`Missing parse or transform macro: ${macro}`)
				return original
			}

			return formatRef(pages, $macro.parse, $macro.formatTitle, ref, title, ...args)
		},
	)
}

/**
 * @template {(...args: string[]) => RegExp} T
 * @template {(ref: string, title: string) => string} F
 * @param {string[]} pages
 * @param {T} parseHref
 * @param {F | undefined | null} formatTitle
 * @param {string} ref
 * @param {string|undefined} title
 * @param  {...string[]} args
 * @returns {string}
 */
function formatRef(pages, parseHref, formatTitle, ref, title, ...args) {
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

/**
 * @returns {Promise<string[]>}
 */
function getAllPages() {
	return cached('pages', () => findPaths(compatData).sort((lhs, rhs) => lhs.length - rhs.length))
}

/**
 *
 * @param {import('@mdn/browser-compat-data/types').PrimaryIdentifier} object
 * @param {string[]} path
 * @returns
 */
function findPaths(object, path = []) {
	/** @type {string[]} */
	const paths = []

	for (const key of Object.getOwnPropertyNames(object)) {
		if (key === '__compat') {
			continue
		}

		const value = object[key]

		if (typeof value !== 'object' || Array.isArray(value) || value === null) {
			continue
		}

		if (value.__compat) {
			paths.push(['', ...path, key].join('/'))
		}

		paths.push(...findPaths(value, [...path, key]))
	}

	return paths
}
