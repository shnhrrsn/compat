import { SimpleSupportStatement } from '@mdn/browser-compat-data/types'

export type HtmlTree = {
	id: string
	tree: import('hast').Root
}

export type CommitInfo = {
	sha: string
	date: string
}

export type PageMetadata = {
	self: string[]
	type: 'page'
	commit?: CommitInfo
	title: string
	links: {
		mdn?: string
		spec?: string
		github?: string
	}
	content: {
		intro?: HtmlTree
		seeAlso?: HtmlTree
	}
	usage: number
	support: Record<string, PageSupport>
	status?: StatusBlock
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
