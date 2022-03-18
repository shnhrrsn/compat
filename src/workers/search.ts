import escapeStringRegexp from 'escape-string-regexp'
import { Fzf } from 'fzf'
import execWithIndices, { RegExpExecArray } from 'regexp-match-indices'

const limit = 15

// @ts-ignore
const indexURL = new URL('@/public/@data/search-index.json', import.meta.url)
const index = fetch(indexURL.toString()).then(
	data => data.json() as Promise<{ data: { title: string; href: string }[]; index: any }>,
)

// Create fzf instance via a reusable promise
const $fzf = index.then(({ data }) => {
	return new Fzf(data, {
		selector: item => item.title,
		limit,
	})
})

self.onmessage = ({ data }) => {
	const term = data.term as string

	if (isFuzzySearchString(term)) {
		// Fuzzy logic mirrored from https://github.com/mdn/yari/blob/22c4229ba7fae94067944690c64fcec0c05d038b/client/src/search.tsx#L207
		if (term.trim() === '/') {
			self.postMessage({ term, results: undefined })
			return
		}

		$fzf.then(fzf => fzf.find(term.substring(1))).then(results => {
			self.postMessage({ term, results })
		})

		return
	}

	index.then(({ data }) => {
		const exec = makeExecWithIndices(
			new RegExp(
				term
					.split(/\s+/)
					.map(term => `(${escapeStringRegexp(term)})`)
					.join('.*'),
				'id',
			),
		)

		const results: any[] = []

		for (const item of data) {
			const matches = exec(item.title)
			if (!matches) {
				continue
			}

			const positions = new Set(
				matches.indices
					.slice(1)
					.map(range =>
						Array(range[1] - range[0])
							.fill(range[0])
							.map((x, y) => x + y),
					)
					.flat(),
			)

			results.push({ item, positions })
			if (results.length >= limit) {
				break
			}
		}

		self.postMessage({ term, results })
	})
}

function isFuzzySearchString(str: string) {
	return str.startsWith('/') && !/\s/.test(str)
}

function makeExecWithIndices(regexp: RegExp): (string: string) => RegExpExecArray | null {
	if ('hasIndices' in RegExp.prototype) {
		return regexp.exec.bind(regexp) as any
	}

	// NOTE: escape-string-regexp is outdated and was published prior to the `d` flag being added
	regexp = new RegExp(regexp.source, regexp.flags.replace(/d/, ''))
	return execWithIndices.bind(null, regexp)
}
