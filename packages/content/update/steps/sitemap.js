import { sourceUrl } from '../config.js'
import loadFrontMatter from '../markdown/loadFrontMatter.js'

/**
 * @param {Set<string>} files
 * @param {import('ora').Ora} spinner
 * @param {import('../utils/progress').Progress} progress
 * @returns
 */
export default async function sitemap(files, spinner, progress) {
	progress.total = files.size

	/** @type {Map<string, string>} */
	const map = new Map()

	for (const file of files) {
		try {
			const matter = await loadFrontMatter(new URL(file, sourceUrl), false)
			const compat = matter['browser-compat']
			if (typeof compat !== 'string') {
				continue
			}

			map.set(compat, file)
		} catch (error) {
			if (/** @type {any} */ (error).code === 'ENOENT') {
				continue
			}

			throw error
		}
	}

	return map
}
