import nodejsVersions from '@/@data/nodejsVersions'
import { coerce, compare, Range, SemVer } from 'semver'
import { AgentVersion } from '../agent'
import { makeAgent } from './makeAgent'

export default function node() {
	return makeAgent(
		'Node.js',
		new Map(
			Object.entries(nodejsVersions)
				.map(
					([version, date]) =>
						[coerce(version), { date, usage: null }] as [SemVer, AgentVersion],
				)
				.sort(([lhs], [rhs]) => compare(lhs, rhs))
				.map(([semver, agentVersion]) => [new Range(semver.format()), agentVersion]),
		),
	)
}
