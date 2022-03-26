import compatData from '@mdn/browser-compat-data'
import chalk from 'chalk'
import { spawn } from 'child_process'
import execa from 'execa'
import { existsSync, promises as fs } from 'fs'
import { oraPromise as ora } from 'ora'
import path from 'path'
import generateFallbackTitle from '../packages/web/src/utils/page/generateFallbackTitle.js'
import generateSupport from '../packages/web/src/utils/page/generateSupport.js'
import loadFrontMatter from '../packages/web/src/utils/page/loadFrontMatter.js'
import markdownToHtml from '../packages/web/src/utils/page/markdownToHtml.js'
import parseMarkdown from '../packages/web/src/utils/page/parseMarkdown.js'
import resolveMdnUrl from '../packages/web/src/utils/page/resolveMdnUrl.js'

/**
 * @typedef {import('@mdn/browser-compat-data/types').StatusBlock} StatusBlock
 * @typedef {import('@mdn/browser-compat-data/types').CompatStatement} CompatStatement
 */

const repo = 'https://github.com/mdn/content.git'
const source = path.join(process.cwd(), '.mdn-content')
const output = path.join(process.cwd(), '@content')
const pattern = 'files/**/*.md'

const rimraf = (...files) => execa('rm', ['-fr', ...files])
const git = (...args) => execa('git', args, { cwd: args[0] === 'clone' ? undefined : source })
const step = (title, callback) =>
	ora(spinner => {
		spinner.text = title
		return callback(spinner)
	})

;(async () => {
	// Clone repo
	await step(`Cloning ${repo}`, async spinner => {
		if (existsSync(source)) {
			await rimraf(source)
		}

		await git('clone', '--branch=main', '--single-branch', repo, source)
	})

	// Get files
	const files = await step(
		'Getting files',
		async () => new Set((await git('ls-files', pattern)).stdout.split(/\n/)),
	)

	// Get commit info
	const map = await progressableStep('Get commit info', (spinner, counts) => {
		return new Promise((resolve, reject) => {
			counts.total = files.size

			const map = new Map()
			const processChunk = chunk => {
				const sha = chunk.substring(0, 40)
				const date = new Date(chunk.substring(40, 65))
				const info = { sha, date }
				for (const file of chunk.substring(66).split(/\n/)) {
					if (map.has(file) || !files.has(file)) {
						continue
					}

					map.set(file, info)
				}

				counts.completed = map.size
			}

			const child = spawn('git', ['log', '--name-only', '--format=format:%H%cI', pattern], {
				cwd: source,
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
				buffer.split(/\n\n/).map(processChunk)
				resolve(map)
			})

			child.on('error', reject)
		})
	})

	// Generate content
	const pages = await progressableStep('Generating', (spinner, counts) =>
		walk(map, compatData, [], counts),
	)

	// Write manifest
	await step('Writing manifest', () => writeJSON(pathnameForRef(['$manifest']), pages))

	// Clean up
	await step('Cleaning up', () => rimraf(source))
})()

async function walk(commits, object, tree = [], counts = { total: 0, completed: 0 }) {
	const pages = []
	const keys = Object.getOwnPropertyNames(object)
	counts.total += keys.length

	for (const key of keys) {
		try {
			if (key === '__compat') {
				continue
			}

			const value = object[key]

			if (typeof value !== 'object' || Array.isArray(value) || value === null) {
				continue
			}

			const ref = [...tree, key]
			const pushPage = page => {
				pages.push({
					type: page.type,
					href: path.join('/', ...page.self),
					title: page.title,
					commit: page.commit,
				})
			}

			await Promise.all([
				walk(commits, value, ref, counts).then(subpages => pages.push(...subpages)),
				value.__compat && generatePage(commits, ref, value.__compat).then(pushPage),
				!value.__compat && generateIndex(commits, ref, Object.keys(value)).then(pushPage),
			])
		} finally {
			counts.completed++
		}
	}

	return pages
}

/**
 * @param {Map<string, { date: Date, sha: string }>} commits
 * @param {string[]} ref
 * @param {CompatStatement} compat
 */
async function generatePage(commits, ref, compat) {
	const support = generateSupport(compat)
	const content = {
		self: ref,
		type: 'page',
		commit: undefined,
		title: generateFallbackTitle(ref),
		links: {
			mdn: compat.mdn_url ?? undefined,
			spec: compat.spec_url ?? undefined,
			github: undefined,
		},
		content: {
			intro: undefined,
			seeAlso: undefined,
		},
		usage: Object.values(support).reduce((curr, { usage }) => curr + (usage.global ?? 0), 0.0),
		support: support,
		status: compat.status,
	}

	const mdn =
		content.links.mdn && resolveMdnUrl(content.links.mdn, path.join(source, 'files/en-us'))

	if (mdn && existsSync(mdn)) {
		const pathname = path.relative(source, mdn)
		content.commit = commits.get(pathname) ?? {}
		content.links.github = `https://github.com/mdn/content/blob/main/${pathname}`

		const { data, content: md } = await loadFrontMatter({ pathname: mdn })

		if (data.title) {
			content.title = data.title
		}

		const ast = await parseMarkdown(md?.replace(/^(\s*\{\{[\s\S]+?\}\}\s*)+/g, ''), ref)
		if (ast) {
			content.content.intro = await markdownToHtml(
				ast.children.find(child => child.type === 'paragraph'),
			)

			const seeAlso = ast.children.findIndex(
				child =>
					child.type === 'heading' &&
					/\s*see\s+(more|also)/i.test(child.children?.[0].value),
			)

			content.content.seeAlso = await markdownToHtml(
				seeAlso >= 0 && ast.children.slice(seeAlso).find(child => child.type === 'list'),
			)
		}
	}

	await writeJSON(pathnameForRef(ref), content)
	return content
}

/**
 * @param {Map<string, { date: Date, sha: string }>} commits
 * @param {string[]} ref
 * @param {string[]} contents
 */
async function generateIndex(commits, ref, contents) {
	const content = {
		self: ref,
		type: 'index',
		title: contents[contents.length - 1],
		links: contents.map(key => ({ title: key, href: path.join('/', ...ref, key) })),
	}

	await writeJSON(pathnameForRef(ref), content)
	return content
}

/**
 * @param {string} pathname
 * @param {any} json
 */
async function writeJSON(pathname, json) {
	try {
		await fs.mkdir(path.dirname(pathname), { recursive: true })
	} catch (error) {}

	await fs.writeFile(pathname, JSON.stringify(json, null, 2))
}

/**
 * @param {string[]} ref
 * @returns {string}
 */
function pathnameForRef(ref) {
	return path.join(output, ...ref.slice(0, ref.length - 1), `${ref[ref.length - 1]}.json`)
}

function progressableStep(title, callback) {
	return step(title, spinner => {
		const counts = {
			$total: 0,
			$completed: 0,

			get total() {
				return this.$total
			},
			get completed() {
				return this.$completed
			},
			set total(value) {
				this.$total = value
				this.$update()
			},
			set completed(value) {
				this.$completed = value
				this.$update()
			},
			$update() {
				spinner.text = `${title} ${chalk.dim(
					`${counts.completed.toLocaleString()} of ${counts.total.toLocaleString()} (~${(
						counts.completed / counts.total
					).toLocaleString(undefined, {
						style: 'percent',
					})})`,
				)}`
			},
		}

		return Promise.resolve(callback(spinner, counts)).then(value => {
			spinner.text = title
			return value
		})
	})
}
