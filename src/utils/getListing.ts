import { ListingProps } from '@/pages/listing'
import { Identifier } from '@mdn/browser-compat-data/types'
import path from 'path'

export default function getListing(page: string[], data: Record<string, Identifier>): ListingProps {
	const index: ListingProps['pages'] = []

	for (const key of Object.keys(data)) {
		index.push({
			title: key,
			href: path.join('/', ...page, key),
		})
	}

	return { title: page[page.length - 1], path: page, pages: index }
}
