import { ListingProps } from '@/pages/listing'
import { PageProps } from '@/pages/page'
import compatData from '@mdn/browser-compat-data'
import getListing from './getListing'
import getPage from './getPage'
import isIdentifierMeta from './page/isIdentifierMeta'

export default async function getPageOrListing(page: string[]): Promise<PageProps | ListingProps> {
	const data = page.reduce((data, key) => data[key], compatData as any)
	return isIdentifierMeta(data) ? getPage(page, data) : getListing(page, data)
}
