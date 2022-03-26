import SemVer from 'semver'
import denoVersions from '../../@data/denoVersions.js'
import makeAgent from './makeAgent.js'

export default function deno() {
	return makeAgent(
		'Deno',
		new Map(
			Object.entries(denoVersions)
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
