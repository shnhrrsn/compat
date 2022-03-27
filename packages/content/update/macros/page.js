/**
 * @param {string} ref
 * @param {string | undefined} title
 * @returns
 */
export function transform(ref, title) {
	title = title ?? ref?.replace(/_/g, ' ').split(/\//).pop()
	return `<a href="${ref.replace(/\s+/g, '_')}">${title}</a>`
}
