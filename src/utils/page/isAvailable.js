/**
 * @typedef {import('../../types/Page').SupportVariant} SupportVariant
 * @typedef {import('../../types/Page').SupportVersion} SupportVersion
 */

/**
 * @param {SupportVariant | null} support
 * @returns {support is Omit<SupportVariant, 'added' | 'removed'> & { added: SupportVersion }}
 */
export default function isAvailable(support) {
	return !!support && !!support.added && !support.removed
}
