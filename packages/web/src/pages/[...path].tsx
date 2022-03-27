import { getManifest, getRef, ListingMetadata, PageMetadata } from '@compat/content'
import Listing from './listing'
import Page from './page'

export default function Path(props: PageMetadata | ListingMetadata) {
	if (props.type === 'listing') {
		return <Listing {...props} />
	}

	return <Page {...props} />
}

export async function getStaticPaths() {
	return {
		paths: (await getManifest()).map(({ href }) => href),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: await getRef(params.path),
	}
}
