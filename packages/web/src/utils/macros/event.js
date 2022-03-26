import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const name = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/api\/.*${name}_event$`, 'i')
}
