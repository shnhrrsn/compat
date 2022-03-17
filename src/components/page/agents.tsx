import Image, { isValidImageSrc } from '@/components/shared/image'
import styles from '@/pages/page.module.css'
import { PageSupport } from '@/utils/getPage'
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
			{usage?.global && usage.relative && (
				<span className={styles.agentUsage}>
					<Usage name={support?.name ?? agent} usage={usage.global} kind="Global" />
					{' / '}
					<Usage name={support?.name ?? agent} usage={usage.relative} kind="Relative" />
				</span>
			)}
		</div>
	)
}

function Usage({
	usage,
	name,
	kind,
}: {
	usage: number
	name: string
	kind: 'Relative' | 'Global'
}) {
	return (
		<span title={`${kind} share of ${name} users running a supported version.`}>
			{usage.toLocaleString(undefined, {
				style: 'percent',
			})}
		</span>
	)
}

function formatAvailability(support: PageSupport | null) {
	if (!support || !support.added || support.removed) {
		return 'Unsupported'
	} else if (!support.added.date) {
		return 'Unknown'
	}

	return new Date(support.added.date * 1000).toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
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
