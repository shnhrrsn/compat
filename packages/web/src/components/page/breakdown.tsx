import { isAvailable as $isAvailable, PageSupport } from '@compat/content'
import classNames from 'classnames'
import { CircledSpacer } from '../shared/circledImage'
import Image, { isValidImageSrc } from '../shared/image'
import { fillUsage, formatAvailability } from './agents'
import AvailabilityIndicator from './availabilityIndicator'
import styles from './breakdown.module.css'
import { BreakdownHistory } from './history'
import Usages from './usages'

export default function Breakdown({ support }: { support: Record<string, PageSupport> }) {
	return (
		<div className={styles.breakdown}>
			<div className={classNames(styles.grid, styles.headers)}>
				<div className={styles.header}>
					<div className={styles.icon}>&nbsp;</div>
					Agent
				</div>
				<div className={styles.header}>Support</div>
				<div className={styles.header}>Adoption</div>
				<CircledSpacer />
			</div>
			<div className={styles.rows}>
				{Object.entries(support).map(([browser, support]) => (
					<Entry key={browser} agent={browser} support={support} />
				))}
			</div>
		</div>
	)
}

function Entry({ agent, support }: { agent: string; support: PageSupport }) {
	support = fillUsage(agent, support)
	const image =
		agent === 'webview_android'
			? 'android'
			: agent === 'samsunginternet_android'
			? 'samsung-internet'
			: agent.replace(/(.+?)_(android|ios)/, 'mobile$1')
	const history = <BreakdownHistory agent={agent} support={support} />
	const isAvailable = $isAvailable(support)

	return (
		<div
			className={classNames(styles.grid, styles.row, styles[image.replace(/mobile/, '')])}
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
		</div>
	)
}
