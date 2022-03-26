/**
 * @param {string} page
 * @param {string} section
 * @returns
 */
export function transform(page, section) {
	const url = `${page}#${section}`.replace(/\s+/g, '_').replace(/:/g, '')
	return `<a href="${url}">${section}</a>`
}
