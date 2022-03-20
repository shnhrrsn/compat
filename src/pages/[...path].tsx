import getAllPages from '@/utils/getAllPages'
import getPageOrListing from '@/utils/getPageOrListing'
import Listing, { ListingProps } from './listing'
import Page, { PageProps } from './page'

export default function Path(props: PageProps | ListingProps) {
	if ('section' in props) {
		return <Page {...props} />
	}

	return <Listing {...props} />
}

export async function getStaticPaths() {
	return {
		paths: await getAllPages(),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: await getPageOrListing(params.path),
	}
}
