export default function maybeMap<T, R>(
	value: T | null | undefined,
	transform: (value: T) => R,
): R | undefined {
	if (value === null || value === undefined) {
		return undefined
	}

	return transform(value)
}
