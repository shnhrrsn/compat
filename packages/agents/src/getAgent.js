import deno from './@data/deno.js'
import mdn from './@data/mdn.js'
import nodejs from './@data/nodejs.js'

/**
 * @typedef {import('./Agent.d.js').Agent} Agent
 */

/** @type {Map<string, Agent | undefined>} */
const cache = new Map()

/**
 * @param {string} name
 * @returns {Readonly<Agent> | undefined}
 */
export default function getAgent(name) {
	if (cache.has(name)) {
		return cache.get(name)
	}

	/** @type {Agent | undefined} */
	let agent = undefined

	if (/^node(js)?/i.test(name)) {
		agent = nodejs
	} else if (/^deno/i.test(name)) {
		agent = deno
	} else {
		agent = mdn[name]
	}

	cache.set(name, agent)
	return agent
}
