/**
 * @param {import('./Page').SupportHistory} support
 * @returns {support is Omit<import('./Page').SupportHistory, 'added'> & { added: import('./Page').SupportVersion }}
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
