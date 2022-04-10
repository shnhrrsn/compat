import SemVer from 'semver'

/**
 * @typedef {import('../Agent.d.js').Agent} Agent
 */

/**
 * @param {string} name
 * @param {Agent['versions']} versions
 * @returns {Agent}
 */
export default function makeAgent(name, versions) {
	return {
		name,
		versions,
		version(version) {
			return versions.get(SemVer.coerce(version)?.format() ?? version)
		},
	}
}
