export function transform(ref: string, path: string, title?: string) {
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
