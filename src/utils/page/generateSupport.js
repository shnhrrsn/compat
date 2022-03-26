import SemVer from 'semver'
import findVersionDate from '../agents/findVersionDate.js'
import formatExternalLinks from '../formatters/formatExternaLinks.js'
import getAgent from '../getAgent.js'
import maybeMap from '../maybeMap.js'
import isFullySupported from './isFullySupported.js'

/**
 * @typedef {import('@mdn/browser-compat-data/types').CompatStatement} CompatStatement
 * @typedef {import('@mdn/browser-compat-data/types').SimpleSupportStatement} SimpleSupportStatement
 * @typedef {import('@mdn/browser-compat-data/types').VersionValue} VersionValue
 *
 * @typedef {import('../../types/Page').PageSupport} PageSupport
 * @typedef {import('../../types/Page').SupportHistory} SupportHistory
 * @typedef {import('../../types/Page').SupportVersion} SupportVersion
 *
 * @typedef {import('../../types/Agent').Agent} Agent
 */

const anyRange = new SemVer.Range('*')

/**
 * @param {CompatStatement} compat
 * @returns
 */
export default function generateSupport(compat) {
	return Object.fromEntries(
		Object.entries(compat.support).map(([name, support]) => {
			const agent = getAgent(name)
			return [
				name,
				$generateSupport(agent, name, Array.isArray(support) ? support : [support]) ?? {
					name: agent?.name ?? name,
					added: null,
					usage: { global: null, relative: null },
					history: null,
				},
			]
		}),
	)
}

/**
 * @param {Agent | undefined} agent
 * @param {string} name
 * @param {SimpleSupportStatement[]} support
 * @returns {Readonly<PageSupport> | null}
 */
function $generateSupport(agent, name, support) {
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

/**
 *
 * @param {Agent} agent
 * @param {string} name
 * @param {SimpleSupportStatement} support
 * @returns {SupportHistory}
 */
function generateHistory(agent, name, support) {
	const added = maybeMap(support.version_added, version => formatVersion(agent, name, version))

	const removed = maybeMap(support.version_removed, version =>
		formatVersion(agent, name, version),
	)

	/** @type {SemVer.Range | null} */
	let range = null

	if (added?.version) {
		if (removed?.version) {
			range = new SemVer.Range(`${added.version.format()} - ${removed.version.format()}`)
		} else {
			range = new SemVer.Range(`>=${added.version.format()}`)
		}
	} else if (removed?.version) {
		range = new SemVer.Range(`<${removed.version.format()}`)
	}

	const usage = range ? computeUsage(agent, range) : null

	/** @type {SupportHistory} */
	const history = {
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

/**
 *
 * @param {Agent} agent
 * @param {string} agentName
 * @param {VersionValue} value
 * @returns {undefined | { version: SemVer.SemVer | null; data: SupportVersion }}
 */
function formatVersion(agent, agentName, value) {
	if (value === null || value === false) {
		return undefined
	}

	// TODO: Handle true better
	const rawVersion = value === true ? '1.0.0' : value
	const version = SemVer.coerce(rawVersion)

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

/**
 * @param {Agent} agent
 * @param {SemVer.Range} range
 * @returns
 */
function computeUsage(agent, range) {
	return Array.from(agent.versions.entries())
		.filter(([r]) => r.intersects(range))
		.map(([, support]) => support.usage ?? 0)
		.reduce((usage, value) => usage + value, 0)
}
