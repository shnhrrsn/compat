import isServer from './isServer.js'

/**
 * @param {string} agent
 * @returns {boolean}
 */
export default function isBrowser(agent) {
	return !isServer(agent)
}
