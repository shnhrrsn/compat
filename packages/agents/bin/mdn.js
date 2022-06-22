import usage from '@compat/usage'
import compatData from '@mdn/browser-compat-data' assert { type: 'json' }
import { promises as fs } from 'fs'
import indentString from 'indent-string'
import SemVer from 'semver'
import isServer from '../src/isServer.js'

process.env.TZ = 'UTC'

/**
 @type {Record<string, {
	name: string
	usage: number
	versions: Record<string, import('../src/Agent').AgentVersion>
 }>} */
const data = {}

for (const [browser, { name, releases }] of Object.entries(compatData.browsers)) {
	if (isServer(browser)) {
		continue
	}

	const sortedReleases = Object.entries(releases).sort(([lhs], [rhs]) =>
		rhs.localeCompare(lhs, undefined, { numeric: true }),
	)

	data[browser] = {
		name,
		usage: 0,
		versions: {},
	}

	/** @type {string | undefined} */
	let lastVersion = undefined
	for (const [index, [version, release]] of sortedReleases.entries()) {
		if (!release.release_date) {
			continue
		}

		const semver = SemVer.coerce(version)?.format() ?? version
		data[browser].versions[semver] = {
			date: new Date(release.release_date).getTime() / 1000.0,
			usage: computeUsage(browser, semver, lastVersion),
		}
		lastVersion = semver
	}
}

await fs.writeFile(
	new URL('../src/@data/mdn.js', import.meta.url),
	[
		"/** @type {Record<string, import('../Agent').Agent>} */",
		'const mdn = {',
		...Object.entries(data).map(([browser, { name, versions }]) =>
			indentString(`${browser}: ${stringify(name, versions)},`, 1, {
				indent: '\t',
			}),
		),
		'}',
		'',
		'export default mdn',
	].join('\n'),
)

/**
 * @param {string} name
 * @param {Record<string, import('../src/Agent').AgentVersion>} versions
 */
function stringify(name, versions) {
	return [
		'{',
		`\tname: '${name}',`,
		`\tversions: new Map(${indentString(
			JSON.stringify(Object.entries(versions), null, '\t'),
			1,
			{ indent: '\t' },
		).trim()})`,
		'}',
	].join('\n')
}

/**
 * MDN excludes browser releases with the same rendering engine
 * This calculates usage by including usage for the request version
 * and all subsequent versions until the next version tracked by MDN
 *
 * @param {string} name
 * @param {string} version
 * @param {string | undefined} nextVersion
 */
function computeUsage(name, version, nextVersion = undefined) {
	const agent = usage[name]

	if (!agent) {
		return null
	}

	nextVersion = nextVersion ?? `${SemVer.major(version) + 1}.0.0`
	const range = new SemVer.Range(`>=${version} <${nextVersion}`)

	/** @type {number | null} */
	let totalUsage = null

	for (const [version, usage] of Object.entries(agent)) {
		if (!range.test(version)) {
			continue
		}

		totalUsage = (totalUsage ?? 0) + usage
	}

	return totalUsage
}
