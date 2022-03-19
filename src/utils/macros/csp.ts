export function parse(ref: string) {
	return new RegExp(`^\/http\/headers\/csp\/Content-Security-Policy\/${ref}$`)
}
