/**
 * @typedef {Map<string,number>} Pageviews
 * @typedef {import('@compat/content').ManifestEntry} ManifestEntry
 * @typedef {import('@compat/content').ManifestPage} ManifestPage
 */

import { filterPages, getManifest } from '@compat/content'
import csv from '@fast-csv/parse'
import { promises as fs } from 'fs'
import fetch from 'node-fetch'

/**
 * @param {Pageviews} pageview
 * @param {ManifestPage} page
 * @returns {Promise<{href: string; title: string; pageviews: number}>}
 */
async function loadPage(pageviews, page) {
	const url = page.mdn && new URL(page.mdn)
	return {
		href: page.href,
		title: page.title,
		pageviews: (url ? pageviews.get(url.pathname.toLowerCase()) : undefined) ?? 0,
	}
}

/**
 * @param {string} data
 * @returns {Promise<Pageviews>}
 */
function computePageviews(data) {
	return new Promise((resolve, reject) => {
		const pageviews = new Map()
		csv.parseString(data, {
			headers: true,
		})
			.on('error', error => console.error(error))
			.on('data', row => {
				// Normalize page + drop locale to count all page views
				const page = row.Page.toLowerCase().replace(/^(\/)?.+?\//, '/')
				const views = Number(row.Pageviews)

				if (pageviews.has(page)) {
					pageviews.set(page, pageviews.get(page) + views)
				} else {
					pageviews.set(page, views)
				}
			})
			.on('end', () => {
				resolve(pageviews)
			})
	})
}

;(async () => {
	const pageviews = await fetch('https://mdn-popularities-prod.s3.amazonaws.com/current.txt')
		.then(result => result.text())
		.then(current => fetch(current))
		.then(result => result.text())
		.then(computePageviews)

	const pages = await getManifest().then(manifest => manifest.filter(filterPages))
	const data = await Promise.all(pages.map(loadPage.bind(null, pageviews)))
	data.sort((lhs, rhs) => rhs.pageviews - lhs.pageviews)

	for (const item of data) {
		// After sorting, there’s no reason to keep pageviews around as they’ll just inflate the size of the index
		delete item.pageviews
	}

	await fs.writeFile(
		new URL('../public/@data/search-index.json', import.meta.url),
		JSON.stringify({ data }),
	)
})()
