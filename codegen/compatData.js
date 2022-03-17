const assert = require('assert')
const { promises: fs, existsSync } = require('fs')
const globby = require('globby')
const path = require('path')
const merge = require('deepmerge')

const compatData = path.join(__dirname, '../data/mdn/browser-compat-data')

async function run() {
	const pathnames = await globby('{css,html,javascript}/**/*.json', {
		cwd: compatData,
	})
	const datas = await Promise.all(
		pathnames.map(pathname =>
			fs.readFile(path.join(compatData, pathname)).then(data => JSON.parse(data.toString())),
		),
	)

	const data = datas.reduce((merged, data) => merge(merged, data), {})
	await fs.writeFile(
		path.join(__dirname, '../src/@data/compatData.ts'),
		`const compatData: any = ${JSON.stringify(data)}\n\nexport default compatData`,
	)
}

run().catch(error => {
	console.error(error)
	process.exit(1)
})
