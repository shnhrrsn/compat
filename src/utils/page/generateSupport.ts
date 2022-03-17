import { CompatStatement, SimpleSupportStatement } from '@mdn/browser-compat-data/types'
import { coerce, Range } from 'semver'
import { findVersionDate } from '../agents/findVersionDate'
import getAgent, { Agent } from '../getAgent'
import { PageSupport } from '../getPage'

export function generateSupport(compat: CompatStatement) {
	return Object.fromEntries(
		Object.entries(compat.support).map(([name, support]) => [
			name,
			$generateSupport(getAgent(name), name, Array.isArray(support) ? support : [support!]),
		]),
	)
}

function $generateSupport(
	agent: Agent | undefined,
	name: string,
	support: SimpleSupportStatement[],
): PageSupport {
	const fullSupport = support.find(support => !support.prefix) ?? support[0]
	if (
		!agent ||
		!fullSupport ||
		fullSupport.version_added === null ||
		fullSupport.version_added === false
	) {
		return {
			name,
			added: null,
			usage: { global: null, relative: null },
		}
	}

	// TODO: Handle true better
	const rawVersion = fullSupport.version_added === true ? '1.0.0' : fullSupport.version_added
	const version = coerce(rawVersion)
	const range = version ? new Range(`>=${version.format()}`) : null
	const usage = range ? computeUsage(agent, range) : null

	return {
		name: agent.name,
		added: {
			version: version?.format() ?? rawVersion,
			date:
				(version ? findVersionDate(name, version) : undefined) ??
				agent.version(rawVersion)?.date ??
				null,
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
