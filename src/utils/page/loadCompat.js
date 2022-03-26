import compatData from '@mdn/browser-compat-data'
import assert from 'assert'
import isIdentifierMeta from './isIdentifierMeta.js'

/**
 * @param {string[]} page
 * @returns {import('@mdn/browser-compat-data/types').CompatStatement}
 */
export default async function loadCompat(page) {
	const data = page.reduce((data, key) => data[key], compatData)
	assert(isIdentifierMeta(data))
	assert(data.__compat)
	return data.__compat
}
