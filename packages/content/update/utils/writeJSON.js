import { promises as fs } from 'fs'

/**
 * @param {URL} url
 * @param {any} json
 */
export default async function writeJSON(url, json) {
	try {
		await fs.mkdir(new URL('..', url), { recursive: true })
	} catch (error) {}

	await fs.writeFile(url, JSON.stringify(json, null, 2))
}
