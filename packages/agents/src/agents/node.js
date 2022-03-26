import SemVer from 'semver'
import versions from '../@versions/nodejs.js'
import makeAgent from './makeAgent.js'

export default function node() {
	return makeAgent(
		'Node.js',
		new Map(
			Object.entries(versions)
				.map(
					([version, date]) =>
						/** @type {[SemVer.SemVer, import('../Agent.d.js').AgentVersion]} */ ([
							SemVer.coerce(version),
							{ date, usage: null },
						]),
				)
				.sort(([lhs], [rhs]) => SemVer.compare(lhs, rhs))
				.map(([semver, agentVersion]) => [new SemVer.Range(semver.format()), agentVersion]),
		),
	)
}
