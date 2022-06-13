import compatData from '@mdn/browser-compat-data' assert { type: 'json' }
import { promises as fs } from 'fs'
import SemVer from 'semver'
import isServer from '../src/isServer.js'

process.env.TZ = 'UTC'

/** @type {Record<string, Record<string, number>>} */
const data = {}

for (const [browser, { releases }] of Object.entries(compatData.browsers)) {
	if (isServer(browser)) {
		continue
	}

	const sortedReleases = Object.entries(releases).sort(([lhs], [rhs]) =>
		rhs.localeCompare(lhs, undefined, { numeric: true }),
	)

	data[browser] = {}
	for (const [version, release] of sortedReleases) {
		if (!release.release_date) {
			continue
		}

		const semver = SemVer.coerce(version)?.format() ?? version
		data[browser][semver] = new Date(release.release_date).getTime() / 1000.0
	}
}

await fs.writeFile(
	new URL('../src/@versions/mdn.js', import.meta.url),
	`/** @type {Record<string, Record<string, number>>} */\nconst versions = ${JSON.stringify(
		data,
		null,
		2,
	)}\n\nexport default versions`,
)
