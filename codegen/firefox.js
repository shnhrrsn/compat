const path = require('path')
const fetch = require('node-fetch')
const { promises: fs } = require('fs')
const { JSDOM } = require('jsdom')
const { coerce } = require('semver')

process.env.TZ = 'UTC'
;(async () => {
	try {
		const versions = {}

		let html = await fetch('https://en.wikipedia.org/wiki/Firefox_early_version_history').then(
			result => result.text(),
		)

		let {
			window: { document },
		} = new JSDOM(html)

		for (const tr of document.querySelectorAll('.wikitable tbody tr')) {
			const tds = tr.querySelectorAll('th, td')
			if (tds.length < 3) {
				continue
			}

			const [releaseDate] = (tds[2].textContent.match(/\w+\s+\d+,\s+\d{4}/g) ?? []).map(
				date => new Date(date).getTime() / 1000.0,
			)

			if (!releaseDate) {
				continue
			}

			const version = tds[0].textContent.trim()

			if (releaseDate) {
				versions[coerce(version)?.format() ?? version] = releaseDate
			}
		}

		html = await fetch('https://en.wikipedia.org/wiki/Firefox_version_history').then(result =>
			result.text(),
		)
		;({
			window: { document },
		} = new JSDOM(html))

		for (const tr of document.querySelectorAll('.wikitable tbody tr')) {
			const tds = tr.querySelectorAll('td')
			if (tds.length < 2) {
				continue
			}

			const [releaseDate] = (tds[1].textContent.match(/\w+\s+\d+,\s+\d{4}/g) ?? []).map(
				date => new Date(date).getTime() / 1000.0,
			)

			if (!releaseDate) {
				continue
			}

			const version = tds[0].textContent.trim().replace(/esr$/, '')
			if (/[ab]\d+$/.test(version)) {
				continue
			}

			if (releaseDate) {
				versions[coerce(version)?.format() ?? version] = releaseDate
			}
		}

		const datadir = path.join(__dirname, '../src/@data')
		await fs.mkdir(datadir, { recursive: true })
		await fs.writeFile(
			path.join(datadir, 'firefoxVersions.ts'),
			`const firefoxVersions: Record<string, number> = ${JSON.stringify(
				versions,
				null,
				2,
			)}\n\nexport default firefoxVersions`,
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
})()
