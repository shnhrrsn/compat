import compatData from '@mdn/browser-compat-data'
import { SimpleSupportStatement } from '@mdn/browser-compat-data/types'
import assert from 'assert'
import generateSupport from './page/generateSupport'
import isIdentifierMeta from './page/isIdentifierMeta'
import loadMetadata from './page/loadMetadata'

export type PageMetadata = {
	title: string | null
	html: {
		intro: string | null
		seeAlso: string | null
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

export type PageSupportVariant = {
	added: SupportVersion | null
	removed?: SupportVersion | null
	usage: {
		global: number | null
		relative: number | null
	}
}

export type PageSupportHistory = PageSupportVariant &
	Omit<SimpleSupportStatement, 'version_added' | 'version_removed' | 'notes'> & {
		notes: string[] | null
	}

export type PageSupport = PageSupportVariant & {
	name: string
	history: PageSupportHistory[] | null
}

export type Page = Omit<PageMetadata, 'urls'> & {
	section: 'javascript' | 'html' | 'css'
	query: string
	urls: PageMetadata['urls'] & {
		mdn: string | null
		spec: string | null
	}
	usage: number
	support: Record<string, PageSupport>
}

export default async function getPage(page: string[]): Promise<Page> {
	const data = page.reduce((data, key) => data[key], compatData as any)
	assert(isIdentifierMeta(data))
	assert(data.__compat)

	const { urls, ...metadata } = await loadMetadata(page, data.__compat)
	const support = generateSupport(data.__compat)

	return {
		section: page[0] as any,
		query: page.join('.'),
		urls: {
			mdn: data.__compat.mdn_url ?? null,
			spec: (data.__compat as any).spec_url ?? null, // Unsure why spec_url isn’t in types
			...urls,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support,
		...metadata,
	}
}
