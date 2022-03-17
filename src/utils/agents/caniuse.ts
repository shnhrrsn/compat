import { agents } from 'caniuse-lite'
import { coerce, compare, Range, SemVer } from 'semver'
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

type VersionRange = {
	key: string
	start: SemVer
	end: string | null
}

export default function caniuse(name: string) {
	const agent = agents[name] ?? agents[browserMap[name]]

	if (!agent) {
		return undefined
	}

	const versions: Agent['versions'] = new Map()
	const keys = Array.from(Object.keys(agent.release_date))
		.map(parseVersionRange)
		.filter(({ start }) => start !== null)
		.sort(({ start: lhs }, { start: rhs }) => compare(lhs, rhs))

	for (const [index, key] of keys.entries()) {
		try {
			versions.set(new Range(formatVersionRange(key, keys[index + 1])), {
				date: agent.release_date[key.key]!,
				usage: agent.usage_global[key.key] ?? null,
			})
		} catch (error) {
			continue
		}
	}

	return makeAgent(agent.browser, versions)
}

function parseVersionRange(key: string): VersionRange {
	if (!key.includes('-')) {
		return { key, start: coerce(key)!, end: null }
	}

	const [start, end] = key.split(/\-/)
	return { key, start: coerce(start)!, end: end }
}

function formatVersionRange(key: VersionRange, next?: VersionRange): string {
	if (key.end) {
		return `${key.start.format()} - ${key.end}`
	} else if (!next) {
		return key.start.format()
	}

	return `${key.start.format()} < ${next.start.format()}`
}
