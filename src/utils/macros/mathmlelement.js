import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/mathml\/elements.*\/${pathname}$`, 'i')
}

export { formatTitle } from './htmlelement.js'
