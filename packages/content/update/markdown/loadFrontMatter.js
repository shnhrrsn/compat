import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'

/**
 * @param {import('fs').PathLike} path
 * @returns {Promise<parseMatter.GrayMatterFile<string>>}
 */
export default async function loadFrontMatter(path) {
	const md = await fs.readFile(path)
	return parseMatter(md.toString())
}
