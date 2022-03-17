import denoVersions from '@/@data/denoVersions'
import { coerce, compare, Range, SemVer } from 'semver'
import { AgentVersion } from '../getAgent'
import { makeAgent } from './makeAgent'

export function deno() {
	return makeAgent(
		'Deno',
		new Map(
			Object.entries(denoVersions)
				.map(
					([version, date]) =>
						[coerce(version), { date, usage: null }] as [SemVer, AgentVersion],
				)
				.sort(([lhs], [rhs]) => compare(lhs, rhs))
				.map(([semver, agentVersion]) => [new Range(semver.format()), agentVersion]),
		),
	)
}
