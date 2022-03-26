/**
 * @template T
 * @template R
 * @param {T | null | undefined} value
 * @param {(value: T) => R} transform
 * @returns {R | undefined}
 */
export default function maybeMap(value, transform) {
	if (value === null || value === undefined) {
		return undefined
	}

	return transform(value)
}
