import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string, params?: string) {
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
