import { isAvailable, PageSupport } from '@compat/content'
import CircledImage from '../shared/circledImage'
import Tooltip from '../shared/tooltip'
import styles from './availabilityIndicator.module.css'
import { thresholds } from './safeToUse'

export default function AvailabilityIndicator({
	className,
	name,
	support,
	size,
}: {
	className?: string
	name: string
	support?: PageSupport | null
	size?: Parameters<typeof CircledImage>[0]['size']
}) {
	const available = isAvailable(support ?? null)
	return (
		<Tooltip title={resolveTooltip(available, name, support)}>
			<div className={className}>
				<CircledImage
					src={available ? 'check' : 'times'}
					size={size}
					className={resolveSupportClassName(support)}
				/>
			</div>
		</Tooltip>
	)
}

function resolveTooltip(available: boolean, name: string, support?: PageSupport | null) {
	if (!available) {
		return (
			<>
				<strong>{name}</strong> does not support this feature.
			</>
		)
	} else if (!support || support.usage.relative === null) {
		return (
			<>
				<strong>{name}</strong> supports this feature.
			</>
		)
	} else if (support.usage.relative < 1) {
		return (
			<>
				There are no users of <strong>{name}</strong> running a supported version.
			</>
		)
	}

	let percentage = support.usage.relative.toLocaleString(undefined, {
		style: 'percent',
	})

	if (support.usage.relative < thresholds.safe) {
		percentage = `Only ${percentage}`
	}

	return (
		<>
			{percentage} of <strong>{name}</strong> users are running a supported version.
		</>
	)
}

function resolveSupportClassName(support: PageSupport | undefined | null) {
	if (!support || support.removed || !support.added) {
		return styles.unsupported
	}

	if (support.usage.relative === null) {
		return undefined
	} else if (support.usage.relative < thresholds.unsafe) {
		return styles.low
	} else if (support.usage.relative < thresholds.safe) {
		return styles.medium
	}

	return styles.high
}
