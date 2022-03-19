import escapeStringRegexp from 'escape-string-regexp'

export function parse(ref: string) {
	const pathname = escapeStringRegexp(ref)
	return new RegExp(`^\/mathml\/elements.*\/${pathname}$`, 'i')
}

export { formatTitle } from './htmlelement'
