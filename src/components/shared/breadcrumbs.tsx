import Link from 'next/link'
import { Fragment } from 'react'
import styles from './breadcrumbs.module.css'

export default function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
	if (crumbs.length === 0) {
		return null
	}

	return (
		<nav className={styles.breadcrumbs}>
			<div className={styles.container}>
				<Breadcrumb href="/" title="docs" />
				{crumbs.slice(0, crumbs.length).map((crumb, index) => (
					<Fragment key={index}>
						<span className={styles.separator}>&#9654;</span>
						<Breadcrumb
							href={`/${crumbs.slice(0, index + 1).join('/')}`}
							title={crumb}
						/>
					</Fragment>
				))}
			</div>
		</nav>
	)
}

function Breadcrumb({ href, title }: { href: string; title: string }) {
	return (
		<Link href={href}>
			<a className={styles.crumb}>{title}</a>
		</Link>
	)
}
