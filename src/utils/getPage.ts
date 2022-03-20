import { SafeHtmlAst } from '@/components/shared/safeHtml'
import { PageProps } from '@/pages/page'
import { IdentifierMeta, SimpleSupportStatement } from '@mdn/browser-compat-data/types'
import assert from 'assert'
import generateSupport from './page/generateSupport'
import loadMetadata from './page/loadMetadata'

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

export default async function getPage(page: string[], data: IdentifierMeta): Promise<PageProps> {
	assert(data.__compat)

	const { urls, ...metadata } = await loadMetadata(page, data.__compat)
	const support = generateSupport(data.__compat)

	return {
		section: page[0] as any,
		path: page,
		query: page.join('.'),
		urls: {
			mdn: data.__compat.mdn_url ?? null,
			spec: (data.__compat as any).spec_url ?? null, // Unsure why spec_url isn’t in types
			...urls,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support,
		status: data.__compat.status ?? null,
		...metadata,
	}
}
