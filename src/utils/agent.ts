import { Range } from 'semver'
import caniuse from './agents/caniuse'
import node from './agents/node'

export type AgentVersion = { date: number; usage: number | null }
export type Agent = {
	name: string
	versions: Map<Range, AgentVersion>
	version(version: string): AgentVersion | undefined
}

export default function agent(name: string): Agent | undefined {
	if (/^node(js)?/i.test(name)) {
		return node()
	}

	return caniuse(name)
}
