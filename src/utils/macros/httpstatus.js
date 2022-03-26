/**
 * @param {string} ref
 * @returns
 */
export function parse(ref) {
	return new RegExp(`^\/http\/status\/${ref}$`)
}
