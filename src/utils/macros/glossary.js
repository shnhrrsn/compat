/**
 * @param {string} ref
 * @param {string | undefined} title
 * @returns
 */
export function transform(ref, title) {
	title = title ?? ref
	return `<a href="/en-US/docs/Glossary/${ref.replace(/\s+/g, '_')}">${title}</a>`
}
