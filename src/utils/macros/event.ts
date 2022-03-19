import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string) {
	const name = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/api\/.*${name}_event$`, 'i')
}
