export type Agent = {
	name: string
	versions: Map<string, AgentVersion>
	version(version: string): AgentVersion | undefined
}

export type AgentVersion = { date: number; usage: number | null }
