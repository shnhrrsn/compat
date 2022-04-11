import { isAvailable as $isAvailable, PageSupport } from '@compat/content'
import classNames from 'classnames'
import { CircledSpacer } from '../shared/circledImage'
import Image, { isValidImageSrc } from '../shared/image'
import Table, { TableHeader, TableHeaders, TableRow } from '../shared/table'
import { formatAvailability } from './agents'
import AvailabilityIndicator from './availabilityIndicator'
import styles from './breakdown.module.css'
import { BreakdownHistory } from './history'
import Usages from './usages'

export default function Breakdown({ support }: { support: Record<string, PageSupport> }) {
	return (
		<Table className={styles.breakdown} gridClassName={styles.grid}>
			<TableHeaders className={classNames(styles.headers)}>
				<TableHeader className={styles.header}>
					<div className={styles.icon}>&nbsp;</div>
					Agent
				</TableHeader>
				<TableHeader className={styles.header}>Support</TableHeader>
				<TableHeader className={styles.header}>Adoption</TableHeader>
				<CircledSpacer />
			</TableHeaders>
			{Object.entries(support).map(([browser, support]) => (
				<Entry key={browser} agent={browser} support={support} />
			))}
		</Table>
	)
}

function Entry({
	agent,
	support,
	className,
}: {
	agent: string
	support: PageSupport
	className?: string
}) {
	const image =
		agent === 'webview_android'
			? 'android'
			: agent === 'samsunginternet_android'
			? 'samsung-internet'
			: agent.replace(/(.+?)_(android|ios)/, 'mobile$1')
	const history = <BreakdownHistory agent={agent} support={support} />
	const isAvailable = $isAvailable(support)

	return (
		<TableRow
			className={classNames(className, styles[image.replace(/mobile/, '')])}
			tabIndex={history ? -1 : undefined}
		>
			<div className={styles.agent} title={`${agent} vs ${image}`}>
				{isValidImageSrc(image) ? (
					<Image
						src={image}
						className={classNames(styles.icon, styles[`icon-${image}`])}
					/>
				) : (
					<div className={styles.icon}>&nbsp;</div>
				)}
				<span className={styles.agentName}>{support.name}</span>
			</div>
			<div className={styles.availability}>
				{formatAvailability(support, { unsupported: styles.unsupported })}
				{isAvailable && support.added?.version && (
					<>
						{' '}
						<span className={styles.version}>v{support.added.version}</span>
					</>
				)}
			</div>
			<div>
				{isAvailable && (
					<Usages
						className={styles.usage}
						name={support?.name ?? agent}
						usage={support.usage}
						includeTitles={false}
					/>
				)}
			</div>
			<AvailabilityIndicator name={support.name} support={support} />
			{history}
		</TableRow>
	)
}
