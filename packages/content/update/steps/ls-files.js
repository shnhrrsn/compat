import { pattern } from '../config.js'
import git from '../utils/git.js'

export default async function lsFiles() {
	return new Set((await git('ls-files', pattern)).stdout.split(/\n/))
}
