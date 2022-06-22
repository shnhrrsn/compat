import { existsSync } from 'fs'
import { repo, sourceUrl } from '../config.js'
import git from '../utils/git.js'

export default async function clone() {
	if (existsSync(new URL('.git/', sourceUrl))) {
		await git('fetch', 'origin', 'main')
		await git('checkout', 'origin/main')
	} else {
		await git('clone', '--branch=main', '--single-branch', repo, sourceUrl)
	}
}
