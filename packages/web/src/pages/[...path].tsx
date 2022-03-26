import { promises as fs } from 'fs'
import path from 'path'
import manifest from '../../../../@content/$manifest.json'
import Listing, { ListingProps } from './listing'
import Page, { PageProps } from './page'

export default function Path(props: PageProps | ListingProps) {
	if (props.type === 'index') {
		return <Listing {...props} />
	}

	return <Page {...props} />
}

export async function getStaticPaths() {
	return {
		paths: manifest.map(({ href }) => href),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: JSON.parse(
			(
				await fs.readFile(
					path.join(
						process.cwd(),
						'../../@content',
						...params.path.slice(0, params.path.length - 1),
						`${params.path[params.path.length - 1]}.json`,
					),
				)
			).toString(),
		),
	}
}
