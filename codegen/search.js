/**
 * @typedef {Map<string,number>} Pageviews
 */

import csv from '@fast-csv/parse'
import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import getAllPages from '../src/utils/getAllPages.ts'
import generateFallbackTitle from '../src/utils/page/generateFallbackTitle.ts'
import loadCompat from '../src/utils/page/loadCompat.ts'
import loadFrontMatter from '../src/utils/page/loadFrontMatter.ts'

/**
 * @param {Pageviews} pageview
 * @param {string} href
 * @returns {Promise<{href: string; title: string; pageviews: number}>}
 */
async function loadPage(pageviews, href) {
	const page = href.substring(1).split(/\//)
	const compat = await loadCompat(href.substring(1).split(/\//))
	const { title, tags, slug } = await loadFrontMatter({ compat })
		.then(({ data: { title, slug } }) => ({ title, slug }))
		.catch(error => {
			if (error.code !== 'ENOENT') {
				throw error
			}

			return { title: generateFallbackTitle(page, compat), slug: null }
		})

	return {
		href,
		title,
		pageviews: (slug ? pageviews.get(path.join('/docs', slug).toLowerCase()) : undefined) ?? 0,
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

	/** @type {(href:string) => ReturnType<loadPage>} */
	const $loadPage = loadPage.bind(null, pageviews)

	const pages = await getAllPages({ listings: false })
	const data = await Promise.all(pages.map($loadPage))
	data.sort((lhs, rhs) => rhs.pageviews - lhs.pageviews)

	for (const item of data) {
		// After sorting, there’s no reason to keep pageviews around as they’ll just inflate the size of the index
		delete item.pageviews
	}

	await fs.writeFile(
		path.join(__dirname, '../public/@data/search-index.json'),
		JSON.stringify({ data }),
	)
})()
