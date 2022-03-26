import classNames from 'classnames'
import styles from './card.module.css'
import ExternalLink from './externalLink'
import Image, { ImageSrc } from './image'

export default function Card({
	icon,
	className,
	children,
}: {
	icon?: ImageSrc
	className?: string
	children: any
}) {
	return (
		<div className={classNames(styles.card, className)}>
			{icon && <Image src={icon} className={styles.icon} />}
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export function ExperimentalCard() {
	return (
		<Card className={styles.experimental} icon="experimental">
			<strong>Experimental:</strong> This feature is experimental.{' '}
			<ExternalLink href="https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Conventions_definitions#experimental">
				Learn More
			</ExternalLink>
		</Card>
	)
}

export function DeprecatedCard() {
	return (
		<Card className={styles.deprecated} icon="trash">
			<strong>Deprecated:</strong> This feature has been formally deprecated and should no
			longer be used.{' '}
			<ExternalLink href="https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Conventions_definitions#deprecated">
				Learn More
			</ExternalLink>
		</Card>
	)
}
