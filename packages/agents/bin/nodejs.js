import { promises as fs } from 'fs'
import indentString from 'indent-string'
import fetch from 'node-fetch'
import SemVer from 'semver'

process.env.TZ = 'UTC'

const json = await fetch('https://nodejs.org/dist/index.json').then(
	result => /** @type {Promise<any[]>} */ (result.json()),
)

const versions = Object.fromEntries(
	json.map(
		({ version, date }) =>
			/** @type {[string, import('../src/Agent').AgentVersion]} */ ([
				SemVer.coerce(version)?.format() ?? version.replace(/^v/, ''),
				{ date: new Date(date).getTime() / 1000.0 },
			]),
	),
)

await fs.writeFile(
	new URL('../src/@data/nodejs.js', import.meta.url),
	[
		"/** @type {import('../Agent').Agent} */",
		'const nodejs = {',
		'\tname: "Node.js",',
		`\tversions: new Map(${indentString(
			JSON.stringify(Object.entries(versions), null, '\t'),
			1,
			{ indent: '\t' },
		).trim()})`,
		'}',
		'',
		'export default nodejs',
	].join('\n'),
)
