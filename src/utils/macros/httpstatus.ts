export function parse(ref: string) {
	return new RegExp(`^\/http\/status\/${ref}$`)
}
