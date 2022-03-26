import useHydrated from '@/utils/hooks/useHydrated'
import useTheme, { Themes } from '@/utils/hooks/useTheme'
import Head from 'next/head'
import Link from 'next/link'
import Search from '../search/search'
import ExternalLink from './externalLink'
import Image from './image'
import styles from './layout.module.css'
import { ThemePicker } from './themePicker'

export const siteTitle = 'compat.codes'

export default function Layout({
	title,
	children,
	aside,
	excludeSearch,
}: {
	title?: string | null
	children: any
	aside?: any
	excludeSearch?: boolean
}) {
	const isHydrated = useHydrated()
	const [theme, setTheme] = useTheme()
	return (
		<>
			{aside}
			<div className={styles.container}>
				<Head>
					<title>
						{title}
						{title && ' | '}
						{siteTitle}
					</title>
				</Head>
				<header className={styles.header}>
					<Link href="/">
						<a className={styles.logo}>
							<Image src="logo" />
						</a>
					</Link>
					{!excludeSearch && <Search className={styles.search} floating />}
					<ExternalLink
						href="https://www.github.com/shnhrrsn/compat"
						className={styles.github}
						title="GitHub"
					>
						<Image src="github" />
					</ExternalLink>
				</header>
				<main>{children}</main>
				<footer className={styles.footer}>
					<div className={styles.credits}>
						<div>
							Built by @
							<ExternalLink href="https://github.com/shnhrrsn">shnhrrsn</ExternalLink>
						</div>
						<div>
							Powered by{' '}
							<ExternalLink href="https://developer.mozilla.org/en-US/">
								mdn
							</ExternalLink>
							{' + '}
							<ExternalLink href="https://caniuse.com/">caniuse</ExternalLink>
						</div>
					</div>
					<div>
						{isHydrated && (
							<ThemePicker themes={Themes} theme={theme} setTheme={setTheme} />
						)}
					</div>
				</footer>
			</div>
		</>
	)
}
