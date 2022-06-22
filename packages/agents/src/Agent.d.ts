export type Agent = {
	name: string
	versions: Map<string, AgentVersion>
}

export type AgentVersion = { date: number; usage?: number | null }
