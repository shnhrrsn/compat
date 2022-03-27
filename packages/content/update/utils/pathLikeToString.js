import { fileURLToPath } from 'url'

/**
 * @param {import('fs').PathLike} pathLike
 * @returns {string}
 */
export default function pathLikeToString(pathLike) {
	if (Buffer.isBuffer(pathLike)) {
		return pathLike.toString()
	} else if (pathLike instanceof URL) {
		return fileURLToPath(pathLike)
	}

	return pathLike
}
