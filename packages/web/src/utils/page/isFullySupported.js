/**
 * @typedef {import('../../types/Page').SupportHistory} SupportHistory
 * @typedef {import('../../types/Page').SupportVersion} SupportVersion
 */

/**
 * @param {SupportHistory} support
 * @returns {support is Omit<SupportHistory, 'added'> & { added: SupportVersion }}
 */
export default function isFullySupported(support) {
	return (
		!!support.added &&
		!support.prefix &&
		!support.alternative_name &&
		!support.flags &&
		!support.partial_implementation
	)
}
