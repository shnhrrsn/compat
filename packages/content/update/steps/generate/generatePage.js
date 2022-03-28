import outputUrlForRef from '../../utils/outputUrlForRef.js'
import resolveMdnUrl from '../../utils/resolveMdnUrl.js'
import writeJSON from '../../utils/writeJSON.js'
import generateMetadata from './generateMetadata.js'
import generateSupport from './generateSupport.js'

/**
 * @param {import('./index.js').CommitInfo} commits
 * @param {import('./index.js').Sitemap} sitemap
 * @param {string[]} ref
 * @param {import('@mdn/browser-compat-data/types').CompatStatement} compat
 */
export default async function generatePage(commits, sitemap, ref, compat) {
	const support = generateSupport(compat)
	const mdn = resolveMdnUrl(compat.mdn_url)
	const metadata = await generateMetadata(commits, ref, mdn)
	const content = /** @type {import('../../../src/Metadata.js').PageMetadata} */ ({
		...metadata,
		type: 'page',
		links: {
			...(metadata.links ?? {}),
			mdn: compat.mdn_url ?? undefined,
			spec: /** @type {any} */ (compat).spec_url ?? undefined,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support: support,
		status: compat.status,
	})

	await writeJSON(outputUrlForRef(ref), content)
	return content
}
