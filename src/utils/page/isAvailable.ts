import { PageSupportVariant, SupportVersion } from '../getPage'

export default function isAvailable(
	support: PageSupportVariant | null,
): support is Omit<PageSupportVariant, 'added' | 'removed'> & { added: SupportVersion } {
	return !!support && !!support.added && !support.removed
}
