import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	const pathname = escapeStringRegexp(
		ref
			.replace(/\(\)/g, '')
			.replace(/\.prototype\./g, '.')
			.replace(/\./g, '/'),
	)
	return new RegExp(`^\/javascript\/.+?\/${pathname}$`, 'i')
}
