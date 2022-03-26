import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/html\/elements.*\/${pathname}$`, 'i')
}

/**
 * @param {string} ref
 * @param {string} title
 * @returns
 */
export function formatTitle(ref, title) {
	if (title === ref && ref.indexOf(' ') === -1) {
		return `&lt;${title}&gt;`
	}

	return title
}
