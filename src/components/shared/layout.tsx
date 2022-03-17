import Image from './image'
import styles from './layout.module.css'

export const siteTitle = 'compat.codes'

export default function Layout({ children }: any) {
	return (
		<div className={styles.container}>
			<header>{<Image src="logo" className={styles.logo} />}</header>
			<main>{children}</main>
		</div>
	)
}
