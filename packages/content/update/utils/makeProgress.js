import chalk from 'chalk'

/**
 * @param {string} title
 * @param {import('ora').Ora} spinner
 * @return {import('./progress').Progress}
 */
export default function makeProgress(title, spinner) {
	let total = 0
	let completed = 0
	const update = () => {
		spinner.text = `${title} ${chalk.dim(
			`${completed.toLocaleString()} of ${total.toLocaleString()} (~${(
				completed / total
			).toLocaleString(undefined, {
				style: 'percent',
			})})`,
		)}`
	}

	return {
		get total() {
			return total
		},

		get completed() {
			return completed
		},

		set total(value) {
			total = value
			update()
		},

		set completed(value) {
			completed = value
			update()
		},
	}
}
