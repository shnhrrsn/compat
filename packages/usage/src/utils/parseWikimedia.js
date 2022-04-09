import csv from '@fast-csv/parse'
import assert from 'assert'

/**
 * @param {string} monthYear
 * @param {NodeJS.ReadableStream} stream
 * @returns {Promise<Map<string, Map<string, number>>>}
 */
export default function parseWikimedia(monthYear, stream) {
	return new Promise((resolve, reject) => {
		/** @type {Map<string, Map<string, number>>} */
		const map = new Map()
		csv.parseStream(stream, {
			headers: true,
			delimiter: '\t',
		})
			.on('error', reject)
			.on('data', row => {
				if (!row.date.startsWith(monthYear)) {
					return
				}

				const views = Number(row.view_count)
				assert(!Number.isNaN(views))

				let submap = map.get(row.browser_family)

				if (!submap) {
					submap = new Map()
					map.set(row.browser_family, submap)
				}

				submap.set(row.browser_major, (submap.get(row.browser_major) ?? 0) + views)
			})
			.on('end', () => {
				resolve(map)
			})
	})
}
