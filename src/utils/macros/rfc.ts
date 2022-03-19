export function transform(rfc: string, title?: string, section?: string) {
	let link = `https://datatracker.ietf.org/doc/html/rfc${rfc}`
	let text = ''

	if (typeof title === 'string' && title.length > 0) {
		text = `: ${title}`
	}

	if (typeof section === 'string') {
		link += `#section-${section}`
		text = `, section ${section}${text}`
	}

	return `<a href="${link}">RFC ${rfc}${text}</a>`
}
