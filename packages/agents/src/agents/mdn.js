import usage from '@compat/usage'
import compatData from '@mdn/browser-compat-data' assert { type: 'json' }
import SemVer from 'semver'
import mdnVersions from '../@versions/mdn.js'

/**
 @typedef {import('../Agent.js').Agent} Agent
 @typedef {import('@mdn/browser-compat-data').BrowserName} BrowserName
 @typedef {{
	key: string
	start: SemVer.SemVer
	end: string | null
 }} VersionRange
*/

/**
 * @param {string} name
 * @returns {Agent | undefined}
 */
export default function mdn(name) {
	const agent = mdnVersions[name]

	if (!agent) {
		return undefined
	}

	const entries = Object.entries(agent)
	return {
		name: compatData.browsers[/** @type{BrowserName} */ (name)]?.name ?? name,
		versions: new Map(
			entries.map(([version, date], index) => [
				version,
				{
					date: date,
					usage: computeUsage(name, version, entries[index - 1]?.[0]),
				},
			]),
		),
	}
}

/**
 * MDN excludes browser releases with the same rendering engine
 * This calculates usage by including usage for the request version
 * and all subsequent versions until the next version tracked by MDN
 *
 * @param {string} name
 * @param {string} version
 * @param {string | undefined} nextVersion
 */
function computeUsage(name, version, nextVersion = undefined) {
	const agent = usage[name]

	if (!agent) {
		return null
	}

	nextVersion = nextVersion ?? `${SemVer.major(version) + 1}.0.0`
	const range = new SemVer.Range(`>=${version} <${nextVersion}`)

	/** @type {number | null} */
	let totalUsage = null

	for (const [version, usage] of Object.entries(agent)) {
		if (!range.test(version)) {
			continue
		}

		totalUsage = (totalUsage ?? 0) + usage
	}

	return totalUsage
}
