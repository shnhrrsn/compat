import assert from 'assert'
import Keyv from 'keyv'
import { KeyvFile } from 'keyv-file'
import path from 'path'

/** @type {Keyv<any>} */
const cache = new Keyv({
	store: new KeyvFile({
		filename: path.join(process.cwd(), '.cache.json'),
	}),
})

export default cache

/**
 @type {{
	<T>(key: string, work: () => T | Promise<T>): Promise<T>;
	<T>(key: string, ttl: number, work: () => T | Promise<T>): Promise<T>;
 }}
 */
export const cached = (key, ...args) => {
	assert(args.length === 1 || args.length === 2)
	const work = /** @type {() => T | Promise<T>} */ (args.pop())
	const ttl = /** @type {number | undefined} */ (args.pop())

	return cache.get(key).then(async value => {
		if (value) {
			return value
		}

		value = await work()
		cache.set(key, value, ttl)
		return value
	})
}
