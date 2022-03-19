const fetch = require('node-fetch')
const path = require('path')
const { promises: fs } = require('fs')

fetch('https://raw.githubusercontent.com/mdn/content/main/files/jsondata/SpecData.json')
	.then(result => result.json())
	.then(json => {
		// Source: https://github.com/mdn/yari/blob/14cc6a0972b2bb6c68a921502f7aecb51536bba6/kumascript/macros/SpecName.ejs
		json['Blending'] = json['Compositing']
		json['CSS3 2D Transforms'] = json['CSS3 Transforms']
		json['CSS3 3D Transforms'] = json['CSS Transforms 2']
		json['CSS3 Break'] = json['CSS3 Fragmentation']
		json['CSS3 Flexbox'] = json['CSS Flexbox']
		json['CSS3 Template'] = json['CSS3 Grid'] = json['CSS Grid']
		json['CSS3 UI'] = json['CSS3 Basic UI']
		json['CSS4 UI'] = json['CSS4 Basic UI']
		json['CSS Scroll Snap Points'] = json['CSS Scroll Snap']
		json['WebSMS'] = json['Messaging']
		json['ES2015'] = json['ES6']
		json['ES7'] = json['ES2016']
		json['ES8'] = json['ES2017']
		return json
	})
	.then(json =>
		fs.writeFile(
			path.join(__dirname, '../src/@data/specData.ts'),
			`const specData: Readonly<Record<string, { name: string; status: string; url: string }>> = Object.freeze(${JSON.stringify(
				json,
				null,
				'\t',
			)})\n\nexport default specData`,
		),
	)
