import { promises as fs } from 'fs'
import indentString from 'indent-string'
import fetch from 'node-fetch'
import SemVer from 'semver'

process.env.TZ = 'UTC'

/** @type {any[]} */
const json = []
let page = 1
while (true) {
	const content = await fetch(
		`https://api.github.com/repos/denoland/deno/releases?per_page=100&page=${page}`,
	).then(result => /** @type {Promise<any[]>} */ (result.json()))

	if (content.length === 0) {
		break
	}

	json.push(...content)
	page++
}

const versions = Object.fromEntries(
	json
		.map(release => [
			(release.name ?? release.tag_name).replace(/^v/, ''),
			new Date(release.published_at ?? release.created_at).getTime() / 1000.0,
		])
		.filter(([name]) => (name?.length ?? 0) > 0)
		.map(([version, date]) => [SemVer.coerce(version)?.format() ?? version, { date }]),
)

await fs.writeFile(
	new URL('../src/@data/deno.js', import.meta.url),
	[
		"/** @type {import('../Agent').Agent} */",
		'const deno = {',
		'\tname: "Deno",',
		`\tversions: new Map(${indentString(
			JSON.stringify(Object.entries(versions), null, '\t'),
			1,
			{ indent: '\t' },
		).trim()})`,
		'}',
		'',
		'export default deno',
	].join('\n'),
)
