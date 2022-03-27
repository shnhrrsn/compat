import outputUrlForRef from '../utils/outputUrlForRef.js'
import writeJSON from '../utils/writeJSON.js'

/**
 * @param {import('../../src/Manifest').Manifest} pages
 * @returns
 */
export default function manifest(pages) {
	return writeJSON(outputUrlForRef(['$manifest']), pages)
}
