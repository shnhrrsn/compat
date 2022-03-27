import { promises as fs } from 'fs'
import { sourceUrl } from '../config.js'

const specData = await fs
	.readFile(new URL('./files/jsondata/SpecData.json', sourceUrl))
	.then(
		buffer =>
			/** @type {Record<string, { name: string; status: string; url: string }>} */ (
				JSON.parse(buffer.toString())
			),
	)
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
		return Object.freeze(json)
	})

export default specData
