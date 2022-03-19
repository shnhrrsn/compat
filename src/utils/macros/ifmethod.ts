export function transform(ref: string, title?: string) {
	return `<code>${title ?? ref}</code>`
}
