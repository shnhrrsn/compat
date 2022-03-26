import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import loadCompat from './loadCompat.js'
import resolveMdnUrl from './resolveMdnUrl.js'

/**
 * @param {{ page: string[] } | { pathname: string } | { compat: import('@mdn/browser-compat-data/types').CompatStatement }} value
 * @returns {Promise<parseMatter.GrayMatterFile<string>>}
 */
export default async function loadFrontMatter(value) {
	if ('page' in value) {
		value = { compat: await loadCompat(value.page) }
	}

	if ('compat' in value) {
		if (!value.compat.mdn_url) {
			const error = new Error('Missing mdn_url')
			error.code = 'ENOENT'
			throw error
		}

		value = { pathname: resolveMdnUrl(value.compat.mdn_url) }
	}

	const md = await fs.readFile(value.pathname)
	return parseMatter(md.toString())
}
