import SemVer from 'semver'
import nodejsVersions from '../../@data/nodejsVersions.js'
import makeAgent from './makeAgent.js'

export default function node() {
	return makeAgent(
		'Node.js',
		new Map(
			Object.entries(nodejsVersions)
				.map(
					([version, date]) =>
						/** @type {[SemVer.SemVer, import('../../types/Agent').AgentVersion]} */ ([
							SemVer.coerce(version),
							{ date, usage: null },
						]),
				)
				.sort(([lhs], [rhs]) => SemVer.compare(lhs, rhs))
				.map(([semver, agentVersion]) => [new SemVer.Range(semver.format()), agentVersion]),
		),
	)
}
