import chromeVersions from '@/@data/chromeVersions'
import firefoxVersions from '@/@data/firefoxVersions'
import safariVersions from '@/@data/safariVersions'
import { SemVer } from 'semver'

export function findVersionDate(name: string, version: SemVer) {
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
