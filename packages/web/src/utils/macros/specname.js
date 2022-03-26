import specData from '../../@data/specData.js'

// Ported from https://github.com/mdn/yari/blob/14cc6a0972b2bb6c68a921502f7aecb51536bba6/kumascript/macros/SpecName.ejs

/**
 * @param {string} ref
 * @param {string | undefined} title
 * @returns
 */
export function transform(spec, anchor, text) {
	if (spec.includes('\n')) {
		throw new Error("SpecName first argument can't have a newline character in it")
	}

	// Pull out the name and URL (or use "unknown" if not available)
	const name = specData[spec]?.name ?? 'Unknown'
	const url = specData[spec]?.url ?? 'about:unknown'
	const href = url + (anchor ?? '')

	// If a replacement link text is provided, use that.
	if (text) {
		return `<a href="${href}">${name}<br /><small>The definition of ‘${text}’ in that specification.</small></a>`
	}

	return `<a href="${href}">${name}</a>`
}
