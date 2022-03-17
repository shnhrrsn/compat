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

export type Page = {
	title: string
	urls: {
		mdn: string | null
		spec: string | null
	}
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
	md: string
	html: string
}

export async function getPage(page: string[]): Promise<Page> {
	const data: MdnCompat = page.reduce((data, key) => data[key], compatData)
	assert(data.__compat)

	if (!data.__compat?.mdn_url) {
		throw new Error()
	}

	const mdnURL = new URL(data.__compat.mdn_url)
	if (mdnURL.host !== 'developer.mozilla.org' || !mdnURL.pathname.startsWith('/docs/')) {
		throw new Error()
	}

	const md = (
		await fs.readFile(path.join(docs, mdnURL.pathname.toLowerCase().substring(5), 'index.md'))
	).toString()
	const matterResult = matter(md)

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
		urls: {
			mdn: data.__compat.mdn_url ?? null,
			spec: data.__compat.spec_url ?? null,
		},
		support,
		title: matterResult.data.title,
		md: matterResult.content,
		html: (
			await remark()
				.use(html)
				.process(
					matterResult.content
						.replace(/^(\{\{\w+\}\}\s)+/g, '')
						.trim()
						.split(/\n\n/)[0],
				)
		).toString(),
	}
}
