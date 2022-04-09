import assert from 'assert'
import { promises as fs } from 'fs'
import { roundTo } from 'round-to'
import SemVer from 'semver'
import buildStatcounterURL from '../src/utils/buildStatcounterURL.js'
import fetchURL from '../src/utils/fetchURL.js'
import parseStatcounter from '../src/utils/parseStatcounter.js'
import parseWikimedia from '../src/utils/parseWikimedia.js'

/** @type {Record<string, string>} */
const gsToMdn = {
	'chrome': 'chrome',
	'chrome_android': 'chrome_android',
	'edge': 'edge',
	'firefox': 'firefox',
	'ie': 'ie',
	'opera': 'opera',
	'safari': 'safari',
	'safari_ios': 'safari_ios',
	'samsung internet': 'samsunginternet_android',
	// MDN browsers that are currently unsupported:
	// 'firefox_android': 'firefox_android',
	// 'opera_android': 'opera_android',
	// 'webview_android': 'webview_android',
}

const date = new Date()
date.setUTCHours(0, 0, 0, 0)
date.setUTCMonth(date.getUTCMonth() - 1, 1)

const monthYear = date.toISOString().substring(0, 7)

const [browsers, ios, chromeAndroidViews] = await Promise.all([
	fetchURL(
		buildStatcounterURL({
			monthYear,
			devices: ['desktop', 'mobile', 'tablet'],
			type: 'browser_version',
		}),
	).then(parseStatcounter),
	fetchURL(
		buildStatcounterURL({
			monthYear,
			devices: ['mobile', 'tablet'],
			type: 'ios_version',
		}),
	)
		.then(parseStatcounter)
		.then(map => map.get('ios')),
	fetchURL(
		'https://analytics.wikimedia.org/published/datasets/periodic/reports/metrics/browser/all_sites_by_browser_family_and_major.tsv',
	)
		.then(parseWikimedia.bind(null, monthYear))
		.then(map => map.get('Chrome Mobile')),
])

let iosBrowsers = 0.0
let chromeAndroidShare = 0.0

for (const [family, versions] of browsers) {
	for (const [version, share] of versions) {
		if (version === 'iphone' || version === 'ipad') {
			// As of April 2022, Apple doesn’t allow custom rendering engines on iOS.
			// This means any iOS based browser has the same rendering capabilities as Safari.
			// For the purposes of Compat, treating them all as Safari paints the clearest picture
			// for developers in terms of usage/feature support.
			iosBrowsers += share
			versions.delete(version)
		} else if (version === 'android' && family === 'chrome') {
			chromeAndroidShare = share
			versions.delete(version)
		}
	}
}

// GS doesn’t report versions for Safari iOS, however since iOS versions map 1:1 with Safari versions
// we can just use the iOS version usage data, relative to overall Safari iOS market share
assert(ios)

/** @type {Map<string, number>} */
const iosSafari = new Map()
browsers.set('safari_ios', iosSafari)

for (const [version, share] of ios) {
	iosSafari.set(version, roundTo(iosBrowsers * (share / 100), 3))
}

// GS doesn’t report versions of Chrome Android, so usage is inferred from Wikimedia.
// Mixing data between GS/Wikimedia is less than ideal and assumes the same version distribution
// between the two, which is unlikely, however it should provide a relatively accurate signal
// vs no signal at all.
assert(chromeAndroidViews)
assert(chromeAndroidShare > 0.0)

const chromeAndroidTotalViews = Array.from(chromeAndroidViews.values()).reduce(
	(total, current) => total + current,
	0,
)

const chromeAndroid = new Map()
browsers.set('chrome_android', chromeAndroid)

for (const [version, views] of chromeAndroidViews) {
	const share = views / chromeAndroidTotalViews
	chromeAndroid.set(version, roundTo(chromeAndroidShare * share, 3))
}

// Remap browsers to MDN names
for (const [family, versions] of new Map(browsers)) {
	versions.delete('other')

	for (const [version, share] of versions) {
		// Cleanup browser versions to use semver
		const semver = SemVer.coerce(version)?.format()
		assert(semver, `Invalid version: "${version}"`)

		if (semver !== version) {
			versions.delete(version)
			versions.set(semver, share)
		}
	}

	const mdn = gsToMdn[family]

	if (mdn === family) {
		continue
	}

	browsers.delete(family)

	if (!mdn) {
		continue
	}

	browsers.set(mdn, versions)
}

await fs.writeFile(
	new URL('../src/@data/usage.js', import.meta.url),
	`/** @type {Record<string, Record<string, number>>} */\nconst usage = ${JSON.stringify(
		browsers,
		(_, value) => (value instanceof Map ? Object.fromEntries(value) : value),
		2,
	)}\n\nexport default usage`,
)
