import path from 'path'
import { sourceUrl } from '../config.js'

/**
 * @param {string | undefined} mdnUrl
 * @returns {URL | undefined}
 */
export default function resolveMdnUrl(mdnUrl) {
	if (!mdnUrl) {
		return undefined
	}

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

	return new URL(path.join('./files/en-us', dirname, 'index.md'), sourceUrl)
}
