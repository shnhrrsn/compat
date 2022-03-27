import remarkParse from 'remark-parse'
import { unified } from 'unified'

/**
 * @param {string | null | undefined} markdown
 * @returns {import('mdast').Root | undefined}
 */
export default function parseMarkdown(markdown) {
	if (!markdown) {
		return undefined
	}

	return unified().use(remarkParse).parse(markdown)
}
