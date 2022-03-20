import compatData from '@mdn/browser-compat-data'
import { PrimaryIdentifier } from '@mdn/browser-compat-data/types'
import { cached } from './cache'

export default function getAllPages(): Promise<string[]> {
	return cached('pages', () => findPaths(compatData))
}

function findPaths(object: PrimaryIdentifier, path: string[] = []) {
	const paths: string[] = []

	for (const key of Object.getOwnPropertyNames(object)) {
		if (key === '__compat') {
			continue
		}

		const value = object[key]

		if (typeof value !== 'object' || Array.isArray(value) || value === null) {
			continue
		}

		paths.push(['', ...path, key].join('/'))
		paths.push(...findPaths(value, [...path, key]))
	}

	return paths
}
