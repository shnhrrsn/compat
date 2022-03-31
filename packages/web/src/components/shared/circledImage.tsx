import classNames from 'classnames'
import styles from './circledImage.module.css'
import Image, { ImageSrc } from './image'

export type CircledImageSrc = Extract<ImageSrc, 'asterisk' | 'check' | 'flag' | 'prefix' | 'times'>

const styleClassNames: Record<CircledImageSrc, string> = {
	asterisk: styles.styleAsterisk,
	check: styles.styleCheck,
	flag: styles.styleFlag,
	prefix: styles.stylePrefix,
	times: styles.styleTimes,
}

const sizeClassName = {
	large: styles.sizeLarge,
	small: styles.sizeSmall,
	medium: styles.sizeMedium,
}

export default function CircledImage({
	src,
	size,
	className,
}: {
	src: CircledImageSrc
	size?: keyof typeof sizeClassName
	className?: string
}) {
	return (
		<div
			className={classNames(
				styles.image,
				styleClassNames[src],
				sizeClassName[size ?? 'small'],
				className,
			)}
		>
			<Image src={src} className={styles.src} />
		</div>
	)
}

export function CircledSpacer({
	size,
	className,
}: {
	size?: keyof typeof sizeClassName
	className?: string
}) {
	return <div className={classNames(styles.space, sizeClassName[size ?? 'small'], className)} />
}
