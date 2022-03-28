/**
 * @param {import('./Metadata').SupportVariant | null} support
 * @returns {support is Omit<import('./Metadata').SupportVariant, 'added' | 'removed'> & { added: import('./Metadata').SupportVersion }}
 */
export function isAvailable(support) {
	return !!support && !!support.added && !support.removed
}
