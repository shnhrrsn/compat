import execa from 'execa'
import { sourceUrl } from '../config.js'
import pathLikeToString from './pathLikeToString.js'

/**
 * @param  {...(string | URL)} args
 * @returns
 */
export default function git(...args) {
	return execa('git', args.map(pathLikeToString), {
		cwd: args[0] === 'clone' ? undefined : pathLikeToString(sourceUrl),
	})
}
