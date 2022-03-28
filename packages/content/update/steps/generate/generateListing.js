import path from 'path'
import { sourceUrl } from '../../config.js'
import outputUrlForRef from '../../utils/outputUrlForRef.js'
import writeJSON from '../../utils/writeJSON.js'
import generateMetadata from './generateMetadata.js'

/**
 * @param {import('./index.js').CommitInfo} commits
 * @param {import('./index.js').Sitemap} sitemap
 * @param {string[]} ref
 * @param {string[]} contents
 * @param {import('../../../src/Manifest').ManifestEntry[]} children
 */
export default async function generateListing(commits, sitemap, ref, contents, children) {
	const mdn = sitemap.get(ref.join('.'))
	const metadata = await generateMetadata(
		commits,
		ref,
		mdn ? new URL(mdn, sourceUrl) : undefined,
		1,
	)

	const map = new Map(children.map(child => [child.href, child]))
	const content = /** @type {import('../../../src/Metadata.js').ListingMetadata} */ ({
		...metadata,
		type: 'listing',
		children: contents.map(key => {
			const href = path.join('/', ...ref, key)
			return {
				title: map.get(href)?.title ?? key,
				href: href,
			}
		}),
	})

	await writeJSON(outputUrlForRef(ref), content)
	return content
}
