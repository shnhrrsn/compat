/**
 * @param {import('./Metadata').SupportHistory} support
 * @returns {support is Omit<import('./Metadata').SupportHistory, 'added'> & { added: import('./Metadata').SupportVersion }}
 */
export function isFullySupported(support) {
	return (
		!!support.added &&
		!support.prefix &&
		!support.alternative_name &&
		!support.flags &&
		!support.partial_implementation
	)
}
