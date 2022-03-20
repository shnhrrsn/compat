import assert from 'assert'
import Keyv from 'keyv'
import { KeyvFile } from 'keyv-file'
import path from 'path'

const cache = new Keyv<any>({
	store: new KeyvFile({
		filename: path.join(process.cwd(), '.cache.json'),
	}),
})

export default cache

export function cached<T>(key: string, work: () => T | Promise<T>): Promise<T>
export function cached<T>(key: string, ttl: number, work: () => T | Promise<T>): Promise<T>
export function cached<T>(key: string, ...args: any[]): Promise<T> {
	assert(args.length === 1 || args.length === 2)
	const work = args.pop() as () => T | Promise<T>
	const ttl = args.pop() as number | undefined

	return cache.get(key).then(async (value: T | undefined) => {
		if (value) {
			return value
		}

		value = await work()
		cache.set(key, value, ttl)
		return value
	})
}
