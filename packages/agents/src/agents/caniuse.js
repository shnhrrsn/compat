import { agents } from 'caniuse-lite'
import SemVer from 'semver'
import makeAgent from './makeAgent.js'

/**
 @typedef {import('../Agent.d.js').Agent} Agent
 @typedef {{
	key: string
	start: SemVer.SemVer
	end: string | null
 }} VersionRange
*/

// Map between mdn + caniuse names
/** @type {Record<string, string>} */
const browserMap = {
	safari_ios: 'ios_saf',
	chrome_android: 'and_chr',
	webview_android: 'android',
	samsunginternet_android: 'samsung',
	firefox_android: 'and_ff',
	opera_android: 'op_mob',
}

/**
 * @param {string} name
 * @returns
 */
export default function caniuse(name) {
	const agent = agents[name] ?? agents[browserMap[name]]

	if (!agent) {
		return undefined
	}

	/** @type {Agent['versions']} */
	const versions = new Map()
	const keys = Array.from(Object.keys(agent.release_date))
		.map(parseVersionRange)
		.filter(({ start }) => start !== null)
		.sort(({ start: lhs }, { start: rhs }) => SemVer.compare(lhs, rhs))

	for (const [index, key] of keys.entries()) {
		try {
			versions.set(new SemVer.Range(formatVersionRange(key, keys[index + 1])), {
				date: /** @type {number} */ (agent.release_date[key.key]),
				usage: agent.usage_global[key.key] ?? null,
			})
		} catch (error) {
			continue
		}
	}

	return makeAgent(agent.browser, versions)
}

/**
 *
 * @param {string} key
 * @returns {VersionRange}
 */
function parseVersionRange(key) {
	if (!key.includes('-')) {
		return { key, start: /** @type {SemVer.SemVer} */ (SemVer.coerce(key)), end: null }
	}

	const [start, end] = key.split(/\-/)
	return { key, start: /** @type {SemVer.SemVer} */ (SemVer.coerce(start)), end: end }
}

/**
 *
 * @param {VersionRange} key
 * @param {VersionRange | undefined} next
 * @returns {string}
 */
function formatVersionRange(key, next) {
	if (key.end) {
		return `${key.start.format()} - ${key.end}`
	} else if (!next) {
		return key.start.format()
	}

	return `${key.start.format()} < ${next.start.format()}`
}
