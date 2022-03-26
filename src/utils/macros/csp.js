/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	return new RegExp(`^\/http\/headers\/csp\/Content-Security-Policy\/${ref}$`)
}
