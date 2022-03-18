import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useRouteChangeStart(handler: () => void) {
	const router = useRouter()
	useEffect(() => {
		router.events.on('routeChangeStart', handler)
		return () => router.events.off('routeChangeStart', handler)
	})
}
