// Ported from https://github.com/mdn/yari/blob/d4ad46660c38441797ab9abac98c4bec4c25d235/kumascript/macros/bug.ejs
export function transform(bugNumber: string, type?: string, commentNumber?: string) {
	type = type || 'bug'
	let bugPageURL = `https://bugzilla.mozilla.org/show_bug.cgi?id=${bugNumber}`
	let comment = ''

	if (commentNumber) {
		const num = Number.parseInt(commentNumber, 10)
		if (!Number.isNaN(num)) {
			bugPageURL += '#c' + num
			comment = `, comment ${num}`
		}
	}

	if (type === 'table') {
		return `<tr><td><a href="${bugPageURL}">${bugNumber}</a></td><td></td></tr>`
	}

	return `<a href="${bugPageURL}">bug&nbsp;${bugNumber}${comment}</a>`
}
