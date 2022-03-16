import { agents } from 'caniuse-lite'
import { readFileSync } from 'fs'
import { coerce, Range } from 'semver'

const browserMap: Record<string, string> = {
	safari_ios: 'ios_saf',
	chrome_android: 'and_chr',
	webview_android: 'android',
	samsunginternet_android: 'samsung',
	firefox_android: 'and_ff',
}

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

function node() {
	const versions: Agent['versions'] = new Map()

	for (const release of JSON.parse(
		readFileSync(require.resolve('node-releases/data/processed/envs.json')).toString(),
	) as { version: string; date: string; lts: boolean; security: boolean }[]) {
		versions.set(new Range(release.version), {
			date: new Date(release.date).getTime() / 1000.0,
			usage: null,
		})
	}

	return makeAgent('Node.js', versions)
}

function caniuse(name: string) {
	const agent = agents[name] ?? agents[browserMap[name]]

	if (!agent) {
		return undefined
	}

	const versions: Agent['versions'] = new Map()

	for (const key of Object.keys(agent.release_date)) {
		try {
			versions.set(new Range(key.replace(/\-/, ' - ')), {
				date: agent.release_date[key]!,
				usage: agent.usage_global[key] ?? null,
			})
		} catch (error) {
			continue
		}
	}

	return makeAgent(agent.browser, versions)
}

function makeAgent(name: string, versions: Agent['versions']): Agent {
	return {
		name,
		versions,
		version(version) {
			const v = coerce(version)

			if (!v) {
				return undefined
			}

			for (const [range, info] of versions) {
				if (range.test(v)) {
					return info
				}
			}

			return undefined
		},
	}
}
