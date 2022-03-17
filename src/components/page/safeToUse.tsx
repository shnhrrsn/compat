import Image from '@/components/shared/image'
import styles from '@/pages/page.module.css'
import classNames from 'classnames'

export default function SafeToUse({ title, usage }: { title: string | null; usage: number }) {
	const safeToUse = usage >= 0.8
	return (
		<div className={styles.safeToUse}>
			<div
				className={classNames(
					styles.safeToUseIcon,
					safeToUse ? styles.safeToUseIconSafe : styles.safeToUseIconUnsafe,
				)}
			>
				<Image src={safeToUse ? 'check' : 'times'} />
			</div>
			<div className={styles.safeToUseText}>
				<p>
					<code>{title}</code> is{' '}
					{!safeToUse ? (
						<strong>not safe</strong>
					) : usage < 0.9 ? (
						<strong>mostly safe</strong>
					) : (
						'considered safe'
					)}{' '}
					to use.
				</p>
				<p>
					It’s supported by{' '}
					<strong
						className={
							safeToUse ? styles.safeToUseTextSafe : styles.safeToUseTextUnsafe
						}
					>
						{usage.toLocaleString(undefined, { style: 'percent' })}
					</strong>{' '}
					of global browsers.
				</p>
			</div>
		</div>
	)
}
