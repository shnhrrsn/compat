/**
 * @param {import("./Manifest.js").ManifestEntry} entry
 * @returns {entry is import("./Manifest.js").ManifestListing}
 */
export function filterListings(entry) {
	return entry.type === 'listing'
}
