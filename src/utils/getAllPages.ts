import compatData from '@mdn/browser-compat-data'
import { PrimaryIdentifier } from '@mdn/browser-compat-data/types'
import { cached } from './cache'

export default function getAllPages(
	{ listings }: { listings: boolean } = { listings: true },
): Promise<string[]> {
	return cached(`pages-${listings}`, () => findPaths(listings, compatData))
}

function findPaths(listings: boolean, object: PrimaryIdentifier, path: string[] = []) {
	const paths: string[] = []

	for (const key of Object.getOwnPropertyNames(object)) {
		if (key === '__compat') {
			continue
		}

		const value = object[key]

		if (typeof value !== 'object' || Array.isArray(value) || value === null) {
			continue
		}

		if (listings || value.__compat) {
			paths.push(['', ...path, key].join('/'))
		}

		paths.push(...findPaths(listings, value, [...path, key]))
	}

	return paths
}
