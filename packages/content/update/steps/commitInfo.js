import assert from 'assert'
import { spawn } from 'child_process'
import { pattern, sourceUrl } from '../config.js'
import pathLikeToString from '../utils/pathLikeToString.js'

/**
 *
 * @param {Set<string>} files
 * @param {import('ora').Ora} spinner
 * @param {import('../utils/progress').Progress} progress
 * @returns {Promise<Map<string, { sha: string, date: string }>>}
 */
export default async function commitInfo(files, spinner, progress) {
	return new Promise((resolve, reject) => {
		progress.total = files.size

		/** @type {Map<string, { sha: string, date: string }>} */
		const map = new Map()

		/**
		 * @param {string} chunk
		 */
		const processChunk = chunk => {
			assert(chunk.length > 65)
			try {
				const sha = chunk.substring(0, 40)
				const date = new Date(chunk.substring(40, 65)).toISOString()
				const info = { sha, date }
				for (const file of chunk.substring(66).split(/\n/)) {
					if (map.has(file) || !files.has(file)) {
						continue
					}

					map.set(file, info)
				}

				progress.completed = map.size
			} catch (error) {
				console.log({ chunk, date: chunk.substring(40, 65) })
				throw error
			}
		}

		const child = spawn('git', ['log', '--name-only', '--format=format:%H%cI', pattern], {
			cwd: pathLikeToString(sourceUrl),
		})

		let buffer = ''
		child.stdout.on('data', data => {
			buffer += data

			for (;;) {
				const index = buffer.indexOf('\n\n')
				if (index === -1) {
					break
				}

				processChunk(buffer.substring(0, index))
				buffer = buffer.substring(index + 2)
			}
		})

		child.on('close', code => {
			buffer
				.trim()
				.split(/\n\n/)
				.filter(chunk => chunk.length > 0)
				.map(processChunk)
			resolve(map)
		})

		child.on('error', reject)
	})
}
