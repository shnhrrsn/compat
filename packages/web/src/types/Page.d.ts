import { SafeHtmlAst } from '@/components/shared/safeHtml'
import { SimpleSupportStatement } from '@mdn/browser-compat-data/types'

export type PageMetadata = {
	title: string | null
	html: {
		intro: SafeHtmlAst | null
		seeAlso: SafeHtmlAst | null
	}
	urls: {
		folder: string | null
		github: string | null
	}
	commit: string | null
	lastModified: string | null
}

export type SupportVersion = {
	version: string
	date: number | null
}

export type SupportVariant = {
	added: SupportVersion | null
	removed?: SupportVersion | null
	usage: {
		global: number | null
		relative: number | null
	}
}

export type SupportHistory = SupportVariant &
	Omit<SimpleSupportStatement, 'version_added' | 'version_removed' | 'notes'> & {
		notes: string[] | null
	}

export type PageSupport = SupportVariant & {
	name: string
	history: SupportHistory[] | null
}
