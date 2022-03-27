import { promises as fs } from 'fs'
import { URL as NodeURL } from 'url'

export function getManifest() {
	return fs
		.readFile(new NodeURL('../@content/$manifest.json', import.meta.url))
		.then(
			result => /** @type {import('./Manifest').Manifest} */ (JSON.parse(result.toString())),
		)
}
