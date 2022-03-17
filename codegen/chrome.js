const path = require('path')
const fetch = require('node-fetch')
const { promises: fs } = require('fs')
const { JSDOM } = require('jsdom')
const { coerce } = require('semver')

process.env.TZ = 'UTC'
;(async () => {
	try {
		const html = await fetch(
			'https://en.wikipedia.org/wiki/Google_Chrome_version_history',
		).then(result => result.text())

		const {
			window: { document },
		} = new JSDOM(html)

		const versions = { desktop: {}, android: {}, ios: {} }

		for (const tr of document.querySelectorAll('.wikitable.sortable tbody tr')) {
			const tds = tr.querySelectorAll('td')
			if (tds.length < 2) {
				continue
			}

			const releaseDates = tds[1].textContent.match(/(\d{4}\-\d{2}\-\d{2}(\s*\(.+?\))?)/g)
			const desktop = releaseDates
				.find(releaseDate =>
					/macos|windows|linux|(^\d{4}\-\d{2}\-\d{2}$)/i.test(releaseDate),
				)
				?.split(/\(|\s/)?.[0]

			const android = releaseDates
				.find(releaseDate => /android/i.test(releaseDate))
				?.split(/\(|\s/)?.[0]

			const ios = releaseDates
				.find(releaseDate => /ios/i.test(releaseDate))
				?.split(/\(|\s/)?.[0]

			const version = Number(tds[0].textContent.split(/\./)[0])

			if (Number.isNaN(version) || version <= 0) {
				continue
			}

			const semver = coerce(version)?.format() ?? version

			if (desktop) {
				versions.desktop[semver] = new Date(desktop).getTime() / 1000.0
			}
			if (android) {
				versions.android[semver] = new Date(android).getTime() / 1000.0
			}
			if (ios) {
				versions.ios[semver] = new Date(ios).getTime() / 1000.0
			}
		}

		const datadir = path.join(__dirname, '../src/@data')
		await fs.mkdir(datadir, { recursive: true })
		await fs.writeFile(
			path.join(datadir, 'chromeVersions.ts'),
			`const chromeVersions: { desktop: Record<string, number>; android: Record<string, number>; ios: Record<string, number>; } = ${JSON.stringify(
				versions,
				null,
				2,
			)}\n\nexport default chromeVersions`,
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
})()
