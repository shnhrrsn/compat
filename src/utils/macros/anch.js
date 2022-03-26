/**
 * @param {string} ref
 * @param {string | undefined} title
 * @returns
 */
export function transform(ref, title) {
	return `<code>${title ?? ref}</code>`
}
