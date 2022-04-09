import usage from '@compat/usage'
import compatData from '@mdn/browser-compat-data'
import SemVer from 'semver'
import mdnVersions from '../@versions/mdn.js'
import makeAgent from './makeAgent.js'

/**
 @typedef {import('../Agent.js').Agent} Agent
 @typedef {{
	key: string
	start: SemVer.SemVer
	end: string | null
 }} VersionRange
*/

/**
 * @param {string} name
 * @returns
 */
export default function mdn(name) {
	const agent = mdnVersions[name]

	if (!agent) {
		return undefined
	}

	return makeAgent(
		compatData.browsers[name]?.name ?? name,
		new Map(
			Object.entries(agent).map(([key, date]) => [
				new SemVer.Range(key),
				{
					date: date,
					usage: usage[name]?.[key] ?? null,
				},
			]),
		),
	)
}
