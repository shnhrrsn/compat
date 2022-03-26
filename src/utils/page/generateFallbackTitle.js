/**
 *
 * @param {string[]} page
 * @param {import('@mdn/browser-compat-data/types').CompatStatement | undefined} compat
 * @returns {string}
 */
export default function generateFallbackTitle(page, compat) {
	return page.slice(page.length - 2).join(' / ')
}
