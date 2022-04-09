import Layout from '@/components/shared/layout'
import SafeHtml from '@/components/shared/safeHtml'
import { HtmlTree } from '@compat/content'
import assert from 'assert'
import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toHast } from 'mdast-util-to-hast'
import { removePosition } from 'unist-util-remove-position'
import { URL as NodeURL } from 'url'

export default function UsageData({ content }: { content: HtmlTree }) {
	return (
		<Layout title="Usage Data">
			<SafeHtml ast={content} />
		</Layout>
	)
}

export async function getStaticProps() {
	const methodology = await fs.readFile(
		new NodeURL('../../../usage/METHODOLOGY.markdown', import.meta.url),
	)
	const mast = fromMarkdown(methodology)
	assert(mast.children[0]?.type === 'heading')
	assert(mast.children[0].depth === 1)
	assert(mast.children[0].children[0]?.type === 'text')

	for (const child of mast.children) {
		if (child.type !== 'heading' || child.depth === 1) {
			continue
		}

		child.depth++
	}

	mast.children[0].children[0].value = 'Usage Data'

	const hast = toHast(mast)

	return {
		props: {
			content: {
				id: createHash('md5').update(methodology).digest('hex'),
				tree: removePosition(hast as any, true),
			},
		},
	}
}
