import Keyv from 'keyv'
import { KeyvFile } from 'keyv-file'
import path from 'path'

const cache = new Keyv<any>({
	store: new KeyvFile({
		filename: path.join(process.cwd(), '.cache.json'), // the file path to store the data
		// expiredCheckDelay: 24 * 3600 * 1000, // ms, check and remove expired data in each ms
		// writeDelay: 100, // ms, batch write to disk in a specific duration, enhance write performance.
	}),
})

export default cache
