/**
 * @typedef {import('@mdn/browser-compat-data/types').StatusBlock} StatusBlock
 * @typedef {import('@mdn/browser-compat-data/types').CompatStatement} CompatStatement
 * @typedef {import('ora').Ora} Ora
 */

import { oraPromise as ora } from 'ora'
import { repo, sourceUrl } from './config.js'
import clone from './steps/clone.js'
import commitInfo from './steps/commitInfo.js'
import generate from './steps/generate.js'
import lsFiles from './steps/ls-files.js'
import manifest from './steps/manifest.js'
import sitemap from './steps/sitemap.js'
import makeProgress from './utils/makeProgress.js'
import rimraf from './utils/rimraf.js'

// Clone repo
await step(`Cloning ${repo}`, clone)

// Get files
const files = await step('Getting files', lsFiles)

// Get commit info
const sitemapMap = await stepProgress('Sitemap', sitemap.bind(null, files))

// Get commit info
const commitInfoMap = await stepProgress('Get commit info', commitInfo.bind(null, files))

// Generate content
const pages = await stepProgress('Generating', generate.bind(null, commitInfoMap, sitemapMap))

// Write manifest
await step('Writing manifest', manifest.bind(null, pages))

if (!process.argv.includes('--keep')) {
	// Clean up
	await step('Cleaning up', () => rimraf(sourceUrl))
}

/**
 * @template T
 * @param {string} title
 * @param {(spinner: Ora) => PromiseLike<T>} callback
 * @returns {Promise<T>}
 */
function step(title, callback) {
	return ora(spinner => {
		spinner.text = title
		return callback(spinner)
	})
}

/**
 * @template T
 * @param {string} title
 * @param {(spinner: Ora, progress: import('./utils/progress').Progress) => PromiseLike<T>} callback
 * @returns {Promise<T>}
 */
function stepProgress(title, callback) {
	return step(title, spinner => {
		const progress = makeProgress(title, spinner)
		return Promise.resolve(callback(spinner, progress)).then(value => {
			spinner.text = title
			return value
		})
	})
}
