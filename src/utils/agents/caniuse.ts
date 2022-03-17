import { agents } from 'caniuse-lite'
import { Range } from 'semver'
import { Agent } from '../agent'
import { makeAgent } from './makeAgent'

// Map between mdn + caniuse names
const browserMap: Record<string, string> = {
	safari_ios: 'ios_saf',
	chrome_android: 'and_chr',
	webview_android: 'android',
	samsunginternet_android: 'samsung',
	firefox_android: 'and_ff',
}

export default function caniuse(name: string) {
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
