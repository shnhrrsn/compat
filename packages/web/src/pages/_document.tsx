import { htmlAttribute } from '@/utils/hooks/useTheme'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html {...{ [htmlAttribute]: 'auto' }}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;600&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="57x57"
					href="/favicon/apple-touch-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="114x114"
					href="/favicon/apple-touch-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="72x72"
					href="/favicon/apple-touch-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="144x144"
					href="/favicon/apple-touch-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="60x60"
					href="/favicon/apple-touch-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="120x120"
					href="/favicon/apple-touch-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="76x76"
					href="/favicon/apple-touch-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon-precomposed"
					sizes="152x152"
					href="/favicon/apple-touch-icon-152x152.png"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/favicon/favicon-196x196.png"
					sizes="196x196"
				/>
				<link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
				<link rel="icon" type="image/png" href="/favicon/favicon-128.png" sizes="128x128" />
				<meta name="application-name" content="compat" />
				<meta name="msapplication-TileColor" content="#282C34" />
				<meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
				<meta name="msapplication-square70x70logo" content="/favicon/mstile-70x70.png" />
				<meta
					name="msapplication-square150x150logo"
					content="/favicon/mstile-150x150.png"
				/>
				<meta name="msapplication-wide310x150logo" content="/favicon/mstile-310x150.png" />
				<meta
					name="msapplication-square310x310logo"
					content="/favicon/mstile-310x310.png"
				/>
				<meta property="og:image" content="/favicon/og-image-1200x630.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
