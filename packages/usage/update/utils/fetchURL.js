import { createHash } from 'crypto'
import { createReadStream, createWriteStream, existsSync, promises as fs } from 'fs'
import fetch from 'node-fetch'

/**
 * @param {URL | string} url
 * @returns {Promise<NodeJS.ReadableStream>}
 */
export default async function fetchURL(url) {
	url = url.toString()

	const hash = createHash('md5').update(url).digest('hex')
	const cacheURL = new URL(`../../.cache/${hash}.csv`, import.meta.url)

	if (existsSync(cacheURL)) {
		return createReadStream(cacheURL)
	}

	await fs.mkdir(new URL('./', cacheURL), { recursive: true })

	const { body } = await fetch(url)

	if (!body) {
		throw new Error()
	}

	body.pipe(createWriteStream(cacheURL))
	return body
}
