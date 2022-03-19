import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/html\/elements.*\/${pathname}$`, 'i')
}

export function formatTitle(ref: string, title: string) {
	if (title === ref && ref.indexOf(' ') === -1) {
		return `&lt;${title}&gt;`
	}

	return title
}
