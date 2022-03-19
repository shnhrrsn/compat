export function parse(ref: string) {
	return new RegExp(`^\/http\/methods\/${ref}$`)
}
