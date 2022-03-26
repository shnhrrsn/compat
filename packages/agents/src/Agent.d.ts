import { Range } from 'semver'

export type Agent = {
	name: string
	versions: Map<Range, AgentVersion>
	version(version: string): AgentVersion | undefined
}

export type AgentVersion = { date: number; usage: number | null }
