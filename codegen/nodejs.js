const path = require('path')
const fetch = require('node-fetch')
const { promises: fs } = require('fs')
process.env.TZ = 'UTC'
;(async () => {
	try {
		const json = await fetch('https://nodejs.org/dist/index.json').then(result => result.json())

		const versions = Object.fromEntries(
			json.map(({ version, date }) => [
				version.replace(/^v/, ''),
				new Date(date).getTime() / 1000.0,
			]),
		)

		const datadir = path.join(__dirname, '../src/@data')
		await fs.mkdir(datadir, { recursive: true })
		await fs.writeFile(
			path.join(datadir, 'nodejsVersions.ts'),
			`const nodejsVersions: Record<string, number> = ${JSON.stringify(
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
