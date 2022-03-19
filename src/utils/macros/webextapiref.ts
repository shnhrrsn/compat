import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string) {
	const pathname = escapeStringRegexp(ref.replace(/\./g, '/'))
	return new RegExp(`^\/webextensions/api\/.*${pathname.replace(/(\\\(\\\))/g, '(?:$1)?')}$`, 'i')
}
