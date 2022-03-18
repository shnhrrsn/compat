import { useEffect, useState } from 'react'

// Whether or not the client has hydrated from server
// Useful for when the client state can’t match the server state
export default function useHydrated() {
	const [isHydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])
	return isHydrated
}
