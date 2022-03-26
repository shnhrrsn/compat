import chromeVersions from '../../@data/chromeVersions.js'
import firefoxVersions from '../../@data/firefoxVersions.js'
import safariVersions from '../../@data/safariVersions.js'

/**
 * @param {string} name
 * @param {import('semver').SemVer} version
 * @returns {number | undefined}
 */
export default function findVersionDate(name, version) {
	switch (name) {
		case 'safari':
			return safariVersions.desktop[version.format()]
		case 'safari_ios':
			return safariVersions.ios[version.format()]
		case 'chrome':
			return chromeVersions.desktop[version.format()]
		case 'chrome_android':
			return chromeVersions.android[version.format()]
		case 'firefox':
		case 'firefox_android':
			return firefoxVersions[version.format()]
		default:
			return undefined
	}
}
