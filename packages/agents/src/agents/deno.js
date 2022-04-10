import SemVer from 'semver'
import versions from '../@versions/deno.js'

/**
 * @returns {import('../Agent.d.js').Agent}
 */
export default function deno() {
	return {
		name: 'Deno',
		versions: new Map(
			Object.entries(versions)
				.map(
					/** @returns {[string, import('../Agent.d.js').AgentVersion]} */
					([version, date]) => [version, { date, usage: null }],
				)
				.sort(([lhs], [rhs]) => SemVer.compare(lhs, rhs)),
		),
	}
}
