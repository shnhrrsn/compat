import { transform as geckoRelease } from './geckorelease'

export function transform(ref: string) {
	return `<span title="${geckoRelease(ref)}">Gecko ${ref}</span>`
}
