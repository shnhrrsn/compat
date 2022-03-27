import path from 'path'
import { outputUrl } from '../config.js'

/**
 * @param {string[]} ref
 * @returns {URL}
 */
export default function outputUrlForRef(ref) {
	return new URL(
		path.join(...ref.slice(0, ref.length - 1), `${ref[ref.length - 1]}.json`),
		outputUrl,
	)
}
