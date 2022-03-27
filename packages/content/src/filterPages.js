/**
 * @param {import("./Manifest.js").ManifestEntry} entry
 * @returns {entry is import("./Manifest.js").ManifestPage}
 */
export function filterPages(entry) {
	return entry.type === 'page'
}
