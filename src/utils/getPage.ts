import compatData from '@mdn/browser-compat-data'
import { IdentifierMeta } from '@mdn/browser-compat-data/types'
import assert from 'assert'
import { generateSupport } from './page/generateSupport'
import { loadMetadata } from './page/loadMetadata'

export type PageMetadata = {
	title: string | null
	html: string | null
}

export type SupportVersion = {
	version: string
	date: number | null
}

export type PageSupport = {
	name: string
	added: SupportVersion | null
	removed?: SupportVersion | null
	usage: {
		global: number | null
		relative: number | null
	}
}

export type Page = PageMetadata & {
	section: 'javascript' | 'html' | 'css'
	urls: {
		mdn: string | null
		spec: string | null
	}
	usage: number
	support: Record<string, PageSupport>
}

export async function getPage(page: string[]): Promise<Page> {
	const data = page.reduce((data, key) => data[key], compatData as any)
	assert(isIdentifierMeta(data))
	assert(data.__compat)

	const metadata = await loadMetadata(page, data.__compat)
	const support = generateSupport(data.__compat)

	return {
		section: page[0] as any,
		urls: {
			mdn: data.__compat.mdn_url ?? null,
			spec: (data.__compat as any).spec_url ?? null, // Unsure why spec_url isn’t in types
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support,
		...metadata,
	}
}

function isIdentifierMeta(data: any): data is IdentifierMeta {
	return '__compat' in data
}
