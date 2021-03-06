import { promises as fs } from 'fs'

/**
 * @param {string[]} ref
 * @returns
 */
export function getRef(ref) {
	return fs
		.readFile(new URL(`../@content/${ref.join('/')}.json`, import.meta.url))
		.then(
			result =>
				/** @type {import('./Metadata').PageMetadata | import('./Metadata').ListingMetadata} */ (
					JSON.parse(result.toString())
				),
		)
}
