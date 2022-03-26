import SemVer from 'semver'

/**
 * @typedef {import('../Agent.d.js').Agent} Agent
 */

/**
 *
 * @param {string} name
 * @param {Agent['versions']} versions
 * @returns {Agent}
 */
export default function makeAgent(name, versions) {
	return {
		name,
		versions,
		version(version) {
			const v = SemVer.coerce(version)

			if (!v) {
				return undefined
			}

			for (const [range, info] of versions) {
				if (range.test(v)) {
					return info
				}
			}

			return undefined
		},
	}
}
