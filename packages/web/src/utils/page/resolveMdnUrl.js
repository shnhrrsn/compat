import path from 'path'
import { docs } from '../paths.js'

/**
 * @param {string} mdnUrl
 * @param {string | undefined} repo
 * @returns {string}
 */
export default function resolveMdnUrl(mdnUrl, repo = docs) {
	const url = new URL(mdnUrl)
	if (url.host !== 'developer.mozilla.org' || !url.pathname.startsWith('/docs/')) {
		throw new Error()
	}

	const dirname = url.pathname
		.toLowerCase()
		.substring(5)
		.replace(/\*/g, '_star_')
		.replace(/::/g, '_doublecolon_')
		.replace(/:/g, '_colon_')
		.replace(/\?/g, '_question_')

	return path.join(repo, dirname, 'index.md')
}
