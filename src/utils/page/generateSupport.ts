import { coerce, Range } from 'semver'
import agent, { Agent } from '../agent'
import { MdnCompat, MdnCompatSupport, PageSupport } from '../getPage'

export function generateSupport(compat: Exclude<MdnCompat['__compat'], undefined>) {
	return Object.fromEntries(
		Object.entries(compat.support).map(([name, support]) => [
			name,
			$generateSupport(agent(name), name, support),
		]),
	)
}

function $generateSupport(
	agent: Agent | undefined,
	name: string,
	support: MdnCompatSupport,
): PageSupport {
	if (!agent || !support.version_added) {
		return {
			name,
			added: null,
			usage: { global: null, relative: null },
		}
	}

	const version = coerce(support.version_added)
	const range = version ? new Range(`>=${version.format()}`) : null
	const usage = range ? computeUsage(agent, range) : null

	return {
		name: agent.name,
		added: {
			version: version?.format() ?? support.version_added,
			date: agent.version(support.version_added)?.date ?? null,
		},
		usage: {
			global: usage ? usage / 100.0 : null,
			relative: usage ? usage / computeUsage(agent, new Range('*')) : null,
		},
	}
}

function computeUsage(agent: Agent, range: Range) {
	return Array.from(agent.versions.entries())
		.filter(([r]) => r.intersects(range))
		.map(([, support]) => support.usage ?? 0)
		.reduce((usage, value) => usage + value, 0)
}
