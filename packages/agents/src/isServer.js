/**
 *
 * @param {string} agent
 * @returns {boolean}
 */
export default function isServer(agent) {
	return agent === 'nodejs' || agent === 'deno'
}
