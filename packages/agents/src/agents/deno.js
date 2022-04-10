import SemVer from 'semver'
import versions from '../@versions/deno.js'
import makeAgent from './makeAgent.js'

export default function deno() {
	return makeAgent(
		'Deno',
		new Map(
			Object.entries(versions)
				.map(
					/** @returns {[string, import('../Agent.d.js').AgentVersion]} */
					([version, date]) => [version, { date, usage: null }],
				)
				.sort(([lhs], [rhs]) => SemVer.compare(lhs, rhs)),
		),
	)
}
