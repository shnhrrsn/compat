import { transform as geckoRelease } from './geckorelease.js'

/**
 * @param {string} ref
 * @returns
 */
export function transform(ref) {
	return `<span title="${geckoRelease(ref)}">Gecko ${ref}</span>`
}
