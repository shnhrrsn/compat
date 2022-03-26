import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import SemVer from 'semver'

process.env.TZ = 'UTC'
;(async () => {
	try {
		const json = await fetch('https://nodejs.org/dist/index.json').then(result => result.json())

		const versions = Object.fromEntries(
			json.map(({ version, date }) => [
				SemVer.coerce(version)?.format() ?? version.replace(/^v/, ''),
				new Date(date).getTime() / 1000.0,
			]),
		)

		const output = new URL('../src/@data/nodejsVersions.js', import.meta.url)
		await fs.mkdir(new URL('..', output), { recursive: true })
		await fs.writeFile(
			output,
			`/** @type {Record<string, number>} */\nconst nodejsVersions = ${JSON.stringify(
				versions,
				null,
				2,
			)}\n\nexport default nodejsVersions`,
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
})()
