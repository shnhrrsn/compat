/**
 * @typedef {import('gray-matter').GrayMatterFile<string>} MarkdownMatter
 * @typedef {import('fs').PathLike} PathLike
 */
import { createReadStream, promises as fs } from 'fs'
import parseMatter from 'gray-matter'
import * as readline from 'node:readline'

const delimiter = /= yaml =|---/i

const loadFrontMatter = /**
@type {{
	(path:PathLike, content?: true): Promise<MarkdownMatter>;
	(path:PathLike, content: false): Promise<MarkdownMatter['data']>;
}}
*/ (
	async function (path, content = true) {
		if (content) {
			return parseMatter((await fs.readFile(path)).toString())
		}

		const rl = readline.createInterface({
			input: createReadStream(path),
			output: undefined,
			terminal: false,
		})

		let didStart = false
		let didStop = false
		let matter = ''

		rl.on('line', line => {
			if (didStop) {
				return
			}

			matter += `${line}\n`

			if (!delimiter.test(line)) {
				return
			} else if (didStart) {
				didStop = true
				rl.close()
			} else {
				didStart = true
			}
		})

		return /** @type {Promise<MarkdownMatter['data']>} */ (
			new Promise((resolve, reject) => {
				rl.on('close', () => {
					resolve(parseMatter(matter).data)
				})

				rl.on('error', reject)
			})
		)
	}
)

export default loadFrontMatter
