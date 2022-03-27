import execa from 'execa'
import pathLikeToString from './pathLikeToString.js'

/**
 * @param  {...import('fs').PathLike} files
 * @returns {Promise<void>}
 */
export default async function rimraf(...files) {
	await execa('rm', ['-fr', ...files.map(pathLikeToString)])
}
