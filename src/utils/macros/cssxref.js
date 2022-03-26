import escapeStringRegexp from 'escape-string-regexp'

/**
 * @param {string} ref
 * @param {string | undefined} params
 * @returns
 */
export function parse(ref, params) {
	const pathname = escapeStringRegexp(
		ref
			.replace(/&lt;(color|flex|position)&gt;/g, '$1_value')
			.replace(/&lt;(.*)&gt;/g, '$1')
			.replace(/<(.*)>/g, '$1')
			.replace(/\(\)/g, '')
			.replace(/\:/g, ''),
	)
	return new RegExp(`^\/css\/.*\/${pathname}$`, 'i')
}
