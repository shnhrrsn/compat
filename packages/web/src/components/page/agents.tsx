import Image, { isValidImageSrc } from '@/components/shared/image'
import formatDate from '@/utils/formatters/formatDate'
import { isBrowser } from '@compat/agents'
import { isAvailable, PageSupport, SupportVariant } from '@compat/content'
import styles from './agents.module.css'
import AvailabilityIndicator from './availabilityIndicator'
import Usages from './usages'

export default function Agents({
	agents,
	support,
}: {
	agents: string[]
	support: Record<string, PageSupport>
}) {
	return (
		<div className={styles.agents}>
			{agents.map(agent => (
				<Agent key={agent} agent={agent} support={support[agent]} />
			))}
		</div>
	)
}

function Agent({ agent, support }: { agent: string; support: PageSupport | null }) {
	support = fillUsage(agent, support)
	const added = support?.removed ? null : support?.added
	const usage = support?.removed ? null : support?.usage
	const name = support?.name ?? agent

	return (
		<>
			{isValidImageSrc(agent) ? (
				<Image src={agent} className={styles.icon} />
			) : (
				<div className={styles.icon} />
			)}
			<span className={styles.name}>{name}</span>
			<span className={styles.availability}>
				<span>{formatAvailability(support)}</span>
				<span className={styles.version}>{added && `v${added.version}`}</span>
			</span>
			{usage ? (
				<Usages className={styles.usage} name={name} usage={usage} />
			) : (
				<div className={styles.usage} />
			)}
			<AvailabilityIndicator
				name={name}
				support={support}
				size="medium"
				className={styles.icon}
			/>
		</>
	)
}

export function formatAvailability(
	support: SupportVariant | null,
	classNames?: Partial<{ unsupported: string; unknown: string; date: string }>,
) {
	if (!isAvailable(support)) {
		return <span className={classNames?.unsupported}>Unsupported</span>
	} else if (!support.added?.date) {
		return <span className={classNames?.unknown}>Unknown</span>
	}

	return <span className={classNames?.date}>{formatDate(support.added.date)}</span>
}

export function fillUsage<T extends PageSupport | null>(agent: string, support: T): T {
	if (!support) {
		return support
	}

	const shouldFill = isBrowser(agent) && isAvailable(support)

	return {
		...support,
		usage: {
			global: !support.usage.global && shouldFill ? 0.0 : support.usage.global,
			relative: !support.usage.relative && shouldFill ? 0.0 : support.usage.relative,
		},
	}
}
