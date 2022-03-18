import { CompatStatement } from '@mdn/browser-compat-data/types'

export default function generateFallbackTitle(page: string[], compat?: CompatStatement) {
	return page.slice(page.length - 2).join(' / ')
}
