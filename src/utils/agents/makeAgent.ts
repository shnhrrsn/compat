import { coerce } from 'semver'
import { Agent } from '../getAgent'

export function makeAgent(name: string, versions: Agent['versions']): Agent {
	return {
		name,
		versions,
		version(version) {
			const v = coerce(version)

			if (!v) {
				return undefined
			}

			for (const [range, info] of versions) {
				if (range.test(v)) {
					return info
				}
			}

			return undefined
		},
	}
}
