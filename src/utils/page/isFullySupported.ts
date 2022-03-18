import { PageSupportHistory, SupportVersion } from '../getPage'

export default function isFullySupported(
	support: PageSupportHistory,
): support is Omit<PageSupportHistory, 'added'> & { added: SupportVersion } {
	return (
		!!support.added &&
		!support.prefix &&
		!support.alternative_name &&
		!support.flags &&
		!support.partial_implementation
	)
}
