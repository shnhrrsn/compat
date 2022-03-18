import { CompatStatement } from '@mdn/browser-compat-data/types'
import { promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import loadCompat from './loadCompat'
import resolveMdnUrl from './resolveMdnUrl'

export default async function loadFrontMatter(
	value: { page: string[] } | { pathname: string } | { compat: CompatStatement },
) {
	if ('page' in value) {
		value = { compat: await loadCompat(value.page) }
	}

	if ('compat' in value) {
		if (!value.compat.mdn_url) {
			const error: any = new Error('Missing mdn_url')
			error.code = 'ENOENT'
			throw error
		}

		value = { pathname: resolveMdnUrl(value.compat.mdn_url) }
	}

	const md = await fs.readFile(value.pathname)
	return parseMatter(md.toString())
}
