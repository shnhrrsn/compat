import caniuse from './agents/caniuse.js'
import deno from './agents/deno.js'
import node from './agents/node.js'

/**
 * @typedef {import('../types/Agent').Agent} Agent
 */

/** @type {Map<string, Agent | undefined>} */
const cache = new Map()

/**
 * @param {string} name
 * @returns {Agent | undefined}
 */
export default function getAgent(name) {
	if (cache.has(name)) {
		return cache.get(name)
	}

	/** @type {Agent | undefined} */
	let agent = undefined

	if (/^node(js)?/i.test(name)) {
		agent = node()
	} else if (/^deno/i.test(name)) {
		agent = deno()
	} else {
		agent = caniuse(name)
	}

	cache.set(name, agent)
	return agent
}
