/**
 * @param {string} ref
 * @param {string} path
 * @param {string | undefined} title
 * @returns
 */
export function transform(ref, path, title) {
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
