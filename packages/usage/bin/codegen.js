import assert from 'assert'
import { promises as fs } from 'fs'
import SemVer from 'semver'
import buildURL from '../src/utils/buildURL.js'
import fetchURL from '../src/utils/fetchURL.js'
import parseStream from '../src/utils/parseStream.js'

/** @type {Record<string, string>} */
const gsToMdn = {
	'chrome': 'chrome',
	'edge': 'edge',
	'firefox': 'firefox',
	'ie': 'ie',
	'opera': 'opera',
	'safari': 'safari',
	'safari_ios': 'safari_ios',
	'samsung internet': 'samsunginternet_android',
	// MDN browsers that are currently unsupported:
	// 'chrome_android': 'chrome_android',
	// 'firefox_android': 'firefox_android',
	// 'opera_android': 'opera_android',
	// 'webview_android': 'webview_android',
}

const [browsers, ios] = await Promise.all([
	fetchURL(
		buildURL({
			devices: ['desktop', 'mobile', 'tablet'],
			type: 'browser_version',
		}),
	).then(parseStream),
	fetchURL(
		buildURL({
			devices: ['mobile', 'tablet'],
			type: 'ios_version',
		}),
	)
		.then(parseStream)
		.then(map => map.get('ios')),
])

let iosBrowsers = 0.0

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
			// No reliable way to determine Chrome Android versions, so better off not reporting
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
	iosSafari.set(version, Math.round(iosBrowsers * (share / 100) * 1_000) / 1_000)
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
