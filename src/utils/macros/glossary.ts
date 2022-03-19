export function transform(ref: string, title?: string) {
	title = title ?? ref
	return `<a href="/en-US/docs/Glossary/${ref.replace(/\s+/g, '_')}">${title}</a>`
}
