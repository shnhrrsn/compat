import compatData from '@mdn/browser-compat-data'
import { CompatStatement } from '@mdn/browser-compat-data/types'
import assert from 'assert'
import isIdentifierMeta from './isIdentifierMeta'

export default async function loadCompat(page: string[]): Promise<CompatStatement> {
	const data = page.reduce((data, key) => data[key], compatData as any)
	assert(isIdentifierMeta(data))
	assert(data.__compat)
	return data.__compat
}
