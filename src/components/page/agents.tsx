import Image, { isValidImageSrc } from '@/components/shared/image'
import styles from '@/pages/page.module.css'
import formatDate from '@/utils/formatters/formatDate'
import { PageSupport, PageSupportVariant } from '@/utils/getPage'
import isAvailable from '@/utils/page/isAvailable'
import classNames from 'classnames'

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
	const added = support?.removed ? null : support?.added
	const usage = support?.removed ? null : support?.usage
	return (
		<div className={classNames(styles.agent, resolveSupportClassName(support))}>
			{isValidImageSrc(agent) && <Image src={agent} className={styles.agentIcon} />}
			<span className={styles.agentName}>{support?.name ?? agent}</span>
			<span className={styles.agentAvailability}>{formatAvailability(support)}</span>
			{added && <span className={styles.agentVersion}>v{added.version}</span>}
			{usage && (
				<Usages className={styles.agentUsage} name={support?.name ?? agent} usage={usage} />
			)}
		</div>
	)
}

export function Usages({
	name,
	usage,
	includeTitles,
	className,
}: {
	name: string
	usage: PageSupportVariant['usage']
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
					<span className={styles.usagesSeperator}>╱</span>
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

export function formatAvailability(
	support: PageSupportVariant | null,
	classNames?: Partial<{ unsupported: string; unknown: string; date: string }>,
) {
	if (!isAvailable(support)) {
		return <span className={classNames?.unsupported}>Unsupported</span>
	} else if (!support.added.date) {
		return <span className={classNames?.unknown}>Unknown</span>
	}

	return <span className={classNames?.date}>{formatDate(support.added.date)}</span>
}

function resolveSupportClassName(support: PageSupport | null) {
	if (!support || support.removed || !support.added) {
		return styles.agentUnsupported
	}

	if (support.usage.relative === null) {
		return undefined
	} else if (support.usage.relative < 0.6) {
		return styles.agentLow
	} else if (support.usage.relative < 0.8) {
		return styles.agentMedium
	}

	return styles.agentHigh
}
