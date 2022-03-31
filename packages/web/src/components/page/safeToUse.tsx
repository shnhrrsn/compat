import CircledImage from '../shared/circledImage'
import styles from './safeToUse.module.css'

export const thresholds = {
	unsafe: 0.6,
	safe: 0.8,
	verySafe: 0.9,
}

export default function SafeToUse({ title, usage }: { title: string | null; usage: number }) {
	const safeToUse = usage >= thresholds.safe
	return (
		<div className={styles.safeToUse}>
			<CircledImage src={safeToUse ? 'check' : 'times'} size="large" />
			<div>
				<p className={styles.text}>
					<code>{title}</code> is{' '}
					{!safeToUse ? (
						<strong>not safe</strong>
					) : usage < thresholds.verySafe ? (
						<strong>mostly safe</strong>
					) : (
						'considered safe'
					)}{' '}
					to use.
				</p>
				<p className={styles.text}>
					It’s supported by{' '}
					<strong className={safeToUse ? styles.safe : styles.unsafe}>
						{usage.toLocaleString(undefined, { style: 'percent' })}
					</strong>{' '}
					of global browsers.
				</p>
			</div>
		</div>
	)
}
