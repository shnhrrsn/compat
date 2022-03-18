import {
	CompatStatement,
	SimpleSupportStatement,
	VersionValue,
} from '@mdn/browser-compat-data/types'
import { coerce, Range, SemVer } from 'semver'
import { findVersionDate } from '../agents/findVersionDate'
import formatExternalLinks from '../formatters/formatExternaLinks'
import getAgent, { Agent } from '../getAgent'
import { PageSupport, PageSupportHistory, SupportVersion } from '../getPage'
import maybeMap from '../maybeMap'
import isFullySupported from './isFullySupported'

const anyRange = new Range('*')

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
					history: null,
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

	const history = support.map(support => generateHistory(agent, name, support))
	const fullSupport = history.find(isFullySupported)

	return {
		name: agent.name,
		added: fullSupport?.added ?? null,
		removed: fullSupport?.removed ?? null,
		usage: fullSupport?.usage ?? { global: null, relative: null },
		history: history,
	}
}

function generateHistory(
	agent: Agent,
	name: string,
	support: SimpleSupportStatement,
): PageSupportHistory {
	const added = maybeMap(support.version_added, version => formatVersion(agent, name, version))

	const removed = maybeMap(support.version_removed, version =>
		formatVersion(agent, name, version),
	)

	let range: Range | null = null

	if (added?.version) {
		if (removed?.version) {
			range = new Range(`${added.version.format()} - ${removed.version.format()}`)
		} else {
			range = new Range(`>=${added.version.format()}`)
		}
	} else if (removed?.version) {
		range = new Range(`<${removed.version.format()}`)
	}

	const usage = range ? computeUsage(agent, range) : null
	const history: PageSupportHistory = {
		notes:
			(typeof support.notes === 'string' ? [support.notes] : support.notes)?.map(
				formatExternalLinks,
			) ?? null,
		added: added?.data ?? null,
		removed: removed?.data ?? null,
		usage: {
			global: usage ? usage / 100.0 : null,
			relative: usage ? usage / computeUsage(agent, anyRange) : null,
		},
	}

	if (support.prefix) {
		history.prefix = support.prefix
	}

	if (support.alternative_name) {
		history.alternative_name = support.alternative_name
	}

	if (support.flags) {
		history.flags = support.flags
	}

	if (support.partial_implementation) {
		history.partial_implementation = support.partial_implementation
	}

	return history
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
