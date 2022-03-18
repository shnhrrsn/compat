import { IdentifierMeta } from '@mdn/browser-compat-data/types'

export default function isIdentifierMeta(data: any): data is IdentifierMeta {
	return '__compat' in data
}
