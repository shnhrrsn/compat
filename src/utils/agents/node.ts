import nodejsVersions from '@/@data/nodejsVersions'
import { Range } from 'semver'
import { makeAgent } from './makeAgent'

export default function node() {
	return makeAgent(
		'Node.js',
		new Map(
			Object.entries(nodejsVersions).map(([version, date]) => [
				new Range(version),
				{ date, usage: null },
			]),
		),
	)
}
