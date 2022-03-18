export default function formatExternalLinks(html: string) {
	return html
		.replace(/href=\"\//g, 'href="https://developer.mozilla.org/')
		.replace(/\<a\s/g, '<a target="_blank" rel="noopener noreferrer" ')
}
