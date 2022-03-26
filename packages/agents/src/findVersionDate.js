import chrome from './@versions/chrome.js'
import firefox from './@versions/firefox.js'
import safari from './@versions/safari.js'

/**
 * @param {string} name
 * @param {import('semver').SemVer} version
 * @returns {number | undefined}
 */
export default function findVersionDate(name, version) {
	switch (name) {
		case 'safari':
			return safari.desktop[version.format()]
		case 'safari_ios':
			return safari.ios[version.format()]
		case 'chrome':
			return chrome.desktop[version.format()]
		case 'chrome_android':
			return chrome.android[version.format()]
		case 'firefox':
		case 'firefox_android':
			return firefox[version.format()]
		default:
			return undefined
	}
}
