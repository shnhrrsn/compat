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
	}
}
