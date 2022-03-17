import compatData from '@/@data/compatData'
import assert from 'assert'
import { generateSupport } from './page/generateSupport'
import { loadMetadata } from './page/loadMetadata'

export type MdnCompatSupport = {
	version_added: string | null
}

export type MdnCompat = {
	__compat?: {
		description?: string
		mdn_url?: string
		spec_url?: string
		support: Partial<{
			chrome: MdnCompatSupport
			chrome_android: MdnCompatSupport
			deno: MdnCompatSupport
			edge: MdnCompatSupport
			firefox: MdnCompatSupport
			firefox_android: MdnCompatSupport
			ie: MdnCompatSupport
			nodejs: MdnCompatSupport
			opera: MdnCompatSupport
			opera_android: MdnCompatSupport
			safari: MdnCompatSupport
			safari_ios: MdnCompatSupport
			samsunginternet_android: MdnCompatSupport
			webview_android: MdnCompatSupport
		}>
		status: { experimental: boolean; standard_track: boolean; deprecated: boolean }
	}
}

export type PageMetadata = {
	title: string | null
	html: string | null
}

export type PageSupport = {
	name: string
	added: null | {
		version: string
		date: number | null
	}
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
	support: {
		[browser in string]: PageSupport
	}
}

export async function getPage(page: string[]): Promise<Page> {
	const data: MdnCompat = page.reduce((data, key) => data[key], compatData)
	assert(data.__compat)

	const metadata = await loadMetadata(page, data.__compat)
	const support = generateSupport(data.__compat)

	return {
		section: page[0] as any,
		urls: {
			mdn: data.__compat.mdn_url ?? null,
			spec: data.__compat.spec_url ?? null,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support,
		...metadata,
	}
}
