export default function formatDate(date: number | Date): string {
	if (typeof date === 'number') {
		date = new Date(date * 1000)
	}

	return date.toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}
