import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string) {
	const name = escapeStringRegexp(ref)
	return new RegExp(`^\/http\/headers\/.*${name}$`, 'i')
}
