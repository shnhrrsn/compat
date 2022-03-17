import { Range } from 'semver'
import caniuse from './agents/caniuse'
import { deno } from './agents/deno'
import node from './agents/node'

export type AgentVersion = { date: number; usage: number | null }
export type Agent = {
	name: string
	versions: Map<Range, AgentVersion>
	version(version: string): AgentVersion | undefined
}

const cache = new Map<string, Agent | undefined>()

export default function getAgent(name: string): Agent | undefined {
	if (cache.has(name)) {
		return cache.get(name)!
	}

	let agent: Agent | undefined
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
