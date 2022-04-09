import csv from '@fast-csv/parse'
import assert from 'assert'

/**
 * @param {NodeJS.ReadableStream} stream
 * @returns {Promise<Map<string, Map<string, number>>>}
 */
export default function parseStream(stream) {
	return new Promise((resolve, reject) => {
		/** @type {Map<string, Map<string, number>>} */
		const map = new Map()
		csv.parseStream(stream, {
			headers: true,
		})
			.on('error', reject)
			.on('data', row => {
				const values = Object.values(row)
				assert(values.length === 2)

				const match = values[0]
					.toLowerCase()
					.match(/^(.+?)\s+(?:(?:for)?\s*(android|iphone|ipad|[\d\.]+))|(other)$/)
				assert(match, `Unexpected format: "${values[0]}"`)

				const [, family, version, other] = match
				const share = Number(values[1])
				assert(!Number.isNaN(share))

				const key = family ?? other
				let submap = map.get(key)

				if (!submap) {
					submap = new Map()
					map.set(key, submap)
				}

				submap.set(version ?? other, share)
			})
			.on('end', () => {
				resolve(map)
			})
	})
}
