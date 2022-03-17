import compatData from '@/@data/compatData'
import assert from 'assert'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import semver from 'semver'
import { URL } from 'url'
import agent from './agent'
import { docs } from './paths'

type MdnCompatSupport = {
	version_added: string | null
}

type MdnCompat = {
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

export type Page = PageMetadata & {
	section: 'javascript' | 'html' | 'css'
	urls: {
		mdn: string | null
		spec: string | null
	}
	usage: number
	support: {
		[browser in string]: {
			name: string
			version_added: string | null
			release_date_added: number | null
			usage: {
				global: number | null
				relative: number | null
			}
		}
	}
}

export async function getPage(page: string[]): Promise<Page> {
	const data: MdnCompat = page.reduce((data, key) => data[key], compatData)
	assert(data.__compat)

	const metadata =
		(await loadMetadata(data.__compat.mdn_url)) ?? generateMetadataFallback(page, data.__compat)

	const support = Object.fromEntries(
		Object.entries(data.__compat.support).map(([name, support]) => {
			const a = agent(name)
			const version = semver.coerce(support.version_added)
			const versionRange = version ? new semver.Range(`>=${version.format()}`) : undefined
			const usage =
				a && version && versionRange
					? Array.from(a.versions.entries())
							.filter(([range]) => range.intersects(versionRange))
							.map(([, support]) => support.usage)
							.reduce((usage, value) => (usage ?? 0) + (value ?? 0), 0)
					: null
			const totalUsage = a
				? Array.from(a.versions.values())
						.map(({ usage }) => usage)
						.reduce((usage, value) => (usage ?? 0) + (value ?? 0), 0)
				: null
			return [
				name,
				{
					name: a?.name ?? name,
					version_added: support.version_added
						? version?.format() ?? support.version_added
						: null,
					release_date_added:
						(support.version_added ? a?.version(support.version_added)?.date : null) ??
						null,
					usage: {
						global: usage ? usage / 100.0 : null,
						relative: usage && totalUsage ? usage / totalUsage : null,
					},
				},
			]
		}),
	)

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

async function loadMetadata(mdn?: string | null): Promise<PageMetadata | null> {
	if (!mdn) {
		return null
	}

	const mdnURL = new URL(mdn)
	if (mdnURL.host !== 'developer.mozilla.org' || !mdnURL.pathname.startsWith('/docs/')) {
		throw new Error()
	}

	try {
		const md = (
			await fs.readFile(
				path.join(docs, mdnURL.pathname.toLowerCase().substring(5), 'index.md'),
			)
		).toString()
		const matterResult = matter(md)

		return {
			title: matterResult.data.title as string,
			html: (
				await remark()
					.use(html)
					.process(
						matterResult.content
							.replace(/^(\s*\{\{.+?\}\}\s*)+/g, '')
							.trim()
							.split(/\n\n/)[0],
					)
			).toString(),
		}
	} catch (error: any) {
		if (error.code === 'ENOENT') {
			return null
		}

		throw error
	}
}

function generateMetadataFallback(
	page: string[],
	compat: Exclude<MdnCompat['__compat'], undefined>,
): PageMetadata {
	return {
		title: page.slice(page.length - 2).join(' '),
		html: compat.description ?? null,
	}
}
