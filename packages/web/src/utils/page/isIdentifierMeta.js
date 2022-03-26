/**
 * @param {any} data
 * @returns {data is import('@mdn/browser-compat-data/types').IdentifierMeta}
 */
export default function isIdentifierMeta(data) {
	return '__compat' in data
}
