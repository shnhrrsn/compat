import { SupportVariant } from '@compat/content'
import classNames from 'classnames'
import styles from './usages.module.css'

export default function Usages({
	name,
	usage,
	includeTitles,
	className,
}: {
	name: string
	usage: SupportVariant['usage']
	includeTitles?: boolean
	className?: string
}) {
	includeTitles ??= true
	return (
		<div className={classNames(styles.usages, className)}>
			{usage.global && usage.relative && (
				<>
					<Usage
						name={name}
						usage={usage.global}
						kind={includeTitles ? 'Global' : undefined}
					/>
					<span className={styles.seperator}>╱</span>
					<Usage
						name={name}
						usage={usage.relative}
						kind={includeTitles ? 'Relative' : undefined}
					/>
				</>
			)}
		</div>
	)
}

export function Usage({
	usage,
	name,
	kind,
}: {
	usage: number
	name: string
	kind?: 'Relative' | 'Global'
}) {
	return (
		<span title={kind && `${kind} share of ${name} users running a supported version.`}>
			{usage.toLocaleString(undefined, {
				style: 'percent',
			})}
		</span>
	)
}
