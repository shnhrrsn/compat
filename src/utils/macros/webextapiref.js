import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const pathname = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/webextensions/api\/.*${pathname.replace(/(\\\(\\\))/g, '(?:$1)?')}$`, 'i')
}
