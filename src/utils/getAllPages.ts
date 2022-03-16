import { promises as fs } from 'fs'
import { globby } from 'globby'
import path from 'path'
import cache from './cache'
import { compatData } from './paths'

export default function getAllPages(): Promise<string[]> {
	return cache.get('pages').then(async (pages: string[] | undefined) => {
		if (pages) {
			return pages
		}

		pages = await $getAllPages()
		cache.set('pages', pages)
		return pages
	})
}

async function $getAllPages(): Promise<string[]> {
	return (
		await Promise.all(
			(
				await globby('javascript/**/*.json', {
					cwd: compatData,
				})
			).map(async file => {
				const pathname = file.substring(0, file.length - 5)
				const data = JSON.parse((await fs.readFile(path.join(compatData, file))).toString())
				return [
					...Array.from(
						Object.keys(
							pathname.split(/\//).reduce((data, key) => data?.[key], data) ?? {},
						),
					)
						.filter(name => name !== '__compat')
						.map(abc => path.join('/', pathname, abc)),
				]
			}),
		)
	).flat()
}
