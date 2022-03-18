export default function unique<T>(iterable: Iterable<T> | ArrayLike<T>): T[] {
	return Array.from(new Set(Array.from(iterable)))
}

export function reduceUnique<T>(): (current: T[], value: T) => T[] {
	return (current, value) => {
		if (!current.includes(value)) {
			current.push(value)
		}

		return current
	}
}
