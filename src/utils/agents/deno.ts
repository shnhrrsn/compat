import denoVersions from '@/@data/denoVersions'
import { Range } from 'semver'
import { makeAgent } from './makeAgent'

export function deno() {
	return makeAgent(
		'Deno',
		new Map(
			Object.entries(denoVersions).map(([version, date]) => [
				new Range(version),
				{ date, usage: null },
			]),
		),
	)
}
