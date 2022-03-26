// organize-imports-ignore
import 'normalize.css/normalize.css'
import '@/styles/global.css'
import { ThemeProvider } from '@/utils/hooks/useTheme'

export default function App({ Component, pageProps }: any) {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}
