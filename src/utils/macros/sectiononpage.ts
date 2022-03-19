export function transform(page: string, section: string) {
	const url = `${page}#${section}`.replace(/\s+/g, '_').replace(/:/g, '')
	return `<a href="${url}">${section}</a>`
}
