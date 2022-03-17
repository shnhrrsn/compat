import {
	CompatStatement,
	SimpleSupportStatement,
	VersionValue,
} from '@mdn/browser-compat-data/types'
import { coerce, Range, SemVer } from 'semver'
import { findVersionDate } from '../agents/findVersionDate'
import getAgent, { Agent } from '../getAgent'
import { PageSupport, SupportVersion } from '../getPage'
import maybeMap from '../maybeMap'

export function generateSupport(compat: CompatStatement) {
	return Object.fromEntries(
		Object.entries(compat.support).map(([name, support]) => {
			const agent = getAgent(name)
			return [
				name,
				$generateSupport(agent, name, Array.isArray(support) ? support : [support!]) ?? {
					name: agent?.name ?? name,
					added: null,
					usage: { global: null, relative: null },
				},
			]
		}),
	)
}

function $generateSupport(
	agent: Agent | undefined,
	name: string,
	support: SimpleSupportStatement[],
): Readonly<PageSupport> | null {
	if (!agent) {
		return null
	}

	const added = maybeMap(
		(
			support.find(support => !support.prefix && support.version_added) ??
			support.find(support => support.version_added)
		)?.version_added,
		version => formatVersion(agent, name, version),
	)

	const removed = maybeMap(
		support.find(support => support.version_removed)?.version_removed,
		version => formatVersion(agent, name, version),
	)

	if (!added) {
		return null
	}

	const range = added.version
		? removed?.version
			? new Range(`${added.version.format()} - ${removed.version.format()}`)
			: new Range(`>=${added.version.format()}`)
		: null
	const usage = range ? computeUsage(agent, range) : null

	return {
		name: agent.name,
		added: added?.data ?? null,
		removed: removed?.data ?? null,
		usage: {
			global: usage ? usage / 100.0 : null,
			relative: usage ? usage / computeUsage(agent, new Range('*')) : null,
		},
	}
}

function formatVersion(
	agent: Agent,
	agentName: string,
	value: VersionValue,
): undefined | { version: SemVer | null; data: SupportVersion } {
	if (value === null || value === false) {
		return undefined
	}

	// TODO: Handle true better
	const rawVersion = value === true ? '1.0.0' : value
	const version = coerce(rawVersion)

	return {
		version,
		data: {
			version: version?.format() ?? rawVersion,
			date:
				(version ? findVersionDate(agentName, version) : undefined) ??
				agent.version(rawVersion)?.date ??
				null,
		},
	}
}

function computeUsage(agent: Agent, range: Range) {
	return Array.from(agent.versions.entries())
		.filter(([r]) => r.intersects(range))
		.map(([, support]) => support.usage ?? 0)
		.reduce((usage, value) => usage + value, 0)
}
