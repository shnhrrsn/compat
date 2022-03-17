const path = require('path')
const fetch = require('node-fetch')
const { promises: fs } = require('fs')
const { JSDOM } = require('jsdom')
process.env.TZ = 'UTC'
;(async () => {
	try {
		const versions = { desktop: {}, ios: {} }

		const html = await fetch('https://en.wikipedia.org/wiki/Safari_version_history').then(
			result => result.text(),
		)

		const {
			window: { document },
		} = new JSDOM(html)

		let section = null
		for (const element of document.querySelectorAll('h3, table')) {
			if (element.tagName === 'H3') {
				section = element.querySelector('.mw-headline')?.textContent.toLowerCase().trim()
			}

			if ((section !== 'mac' && section !== 'ios') || element.tagName !== 'TABLE') {
				continue
			}

			for (const tr of element.querySelectorAll('tbody tr')) {
				const td = tr.querySelectorAll('th, td')
				if (td.length < 3) {
					continue
				}

				const version = td[0].textContent.trim()
				const [date] = (
					td[2].textContent.match(/\w+\s+\d+,\s+\d{4}/) ??
					td[3]?.textContent.match(/\w+\s+\d+,\s+\d{4}/) ??
					td[4]?.textContent.match(/\w+\s+\d+,\s+\d{4}/) ??
					[]
				).map(date => new Date(date).getTime() / 1000.0)

				if (!date) {
					continue
				}

				if (section === 'mac') {
					versions.desktop[version] = date
				} else if (section === 'ios') {
					versions.ios[version] = date
				}
			}
		}

		const datadir = path.join(__dirname, '../src/@data')
		await fs.mkdir(datadir, { recursive: true })
		await fs.writeFile(
			path.join(datadir, 'safariVersions.ts'),
			`const safariVersions: { desktop: Record<string, number>; ios: Record<string, number>; } = ${JSON.stringify(
				versions,
				null,
				2,
			)}\n\nexport default safariVersions`,
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
})()
