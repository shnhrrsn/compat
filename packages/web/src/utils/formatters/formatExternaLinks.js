/**
 * @param {string} html
 * @returns {string}
 */
export default function formatExternalLinks(html) {
	return html
		.replace(/href=\"\//g, 'href="https://developer.mozilla.org/')
		.replace(/\<a\s/g, '<a target="_blank" rel="noopener noreferrer" ')
}
