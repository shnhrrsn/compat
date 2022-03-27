/**
 * @param {import('./Page').SupportVariant | null} support
 * @returns {support is Omit<import('./Page').SupportVariant, 'added' | 'removed'> & { added: import('./Page').SupportVersion }}
 */
export function isAvailable(support) {
	return !!support && !!support.added && !support.removed
}
