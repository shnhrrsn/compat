import { readFileSync } from 'fs'
import { Range } from 'semver'
import { Agent } from '../agent'
import { makeAgent } from './makeAgent'

export default function node() {
	const versions: Agent['versions'] = new Map()

	for (const release of JSON.parse(
		readFileSync(require.resolve('node-releases/data/processed/envs.json')).toString(),
	) as { version: string; date: string; lts: boolean; security: boolean }[]) {
		versions.set(new Range(release.version), {
			date: new Date(release.date).getTime() / 1000.0,
			usage: null,
		})
	}

	return makeAgent('Node.js', versions)
}
