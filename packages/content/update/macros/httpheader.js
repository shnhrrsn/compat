import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const name = escapeStringRegexp(ref)
	return new RegExp(`^\/http\/headers\/.*${name}$`, 'i')
}
