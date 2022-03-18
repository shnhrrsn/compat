import useHydrated from '@/utils/hooks/useHydrated'
import useTheme, { Themes } from '@/utils/hooks/useTheme'
import Link from 'next/link'
import ExternalLink from './externalLink'
import Image from './image'
import styles from './layout.module.css'

export const siteTitle = 'compat.codes'

export default function Layout({ children }: any) {
	const isHydrated = useHydrated()
	const [theme, setTheme] = useTheme()

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Link href="/">
					<a className={styles.logo}>
						<Image src="logo" />
					</a>
				</Link>
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
						<ExternalLink href="https://developer.mozilla.org/en-US/">mdn</ExternalLink>
						{' + '}
						<ExternalLink href="https://caniuse.com/">caniuse</ExternalLink>
					</div>
				</div>
				<div>
					{isHydrated && (
						<select onChange={e => setTheme(e.target.value as any)} value={theme}>
							{Themes.map(theme => (
								<option key={theme} value={theme}>
									{theme}
								</option>
							))}
						</select>
					)}
				</div>
			</footer>
		</div>
	)
}
