import compatData from '@mdn/browser-compat-data'

const allPages = findPaths(compatData).sort((lhs, rhs) => lhs.length - rhs.length)
export default allPages

/**
 *
 * @param {import('@mdn/browser-compat-data/types').PrimaryIdentifier} object
 * @param {string[]} path
 * @returns
 */
function findPaths(object, path = []) {
	/** @type {string[]} */
	const paths = []

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
