import crypto from 'crypto'
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { removePosition } from 'unist-util-remove-position'
import formatMacros from '../utils/formatMacros.js'

/**
 * @param {import('mdast').Root | import('mdast').Content | null | undefined | false} ast
 * @returns
 */
export default function markdownToHtml(ast) {
	if (!ast) {
		return undefined
	} else if (ast.type !== 'root') {
		ast = {
			type: 'root',
			children: [ast],
		}
	}

	return unified()
		.use(remarkRehype)
		.use(rehypeRaw)
		.run(ast)
		.then(unified().use(rehypeStringify).stringify)
		.then(result => formatMacros(result.toString()))
		.then(transformHtml)
}

/**
 * @param {string | null | undefined} html
 * @returns {undefined | { id: string, tree: any }}
 */
export function transformHtml(html) {
	if (!html) {
		return undefined
	}

	return {
		id: crypto.createHash('md5').update(html).digest('hex'),
		tree: removePosition(unified().use(rehypeParse, { fragment: true }).parse(html), true),
	}
}
