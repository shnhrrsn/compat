import styles from '@/pages/page.module.css'
import formatDate from '@/utils/formatters/formatDate'
import { PageSupport, PageSupportHistory } from '@/utils/getPage'
import $isAvailable from '@/utils/page/isAvailable'
import isFullySupported from '@/utils/page/isFullySupported'
import classNames from 'classnames'
import CircledImage, { CircledSpacer } from '../shared/circledImage'
import Image, { isValidImageSrc } from '../shared/image'
import { formatAvailability, Usage, Usages } from './agents'

export default function Breakdown({ support }: { support: Record<string, PageSupport> }) {
	return (
		<div className={styles.breakdown}>
			<div className={classNames(styles.breakdownGrid, styles.breakdownHeaders)}>
				<div className={classNames(styles.breakdownHeader)}>
					<div className={styles.breakdownIcon}>&nbsp;</div>
					Agent
				</div>
				<div className={classNames(styles.breakdownHeader)}>Support</div>
				<div className={classNames(styles.breakdownHeader)}>Adoption</div>
				<CircledSpacer />
			</div>
			<div className={styles.breakdownRows}>
				{Object.entries(support).map(([browser, support]) => (
					<BreakdownEntry key={browser} agent={browser} support={support} />
				))}
			</div>
		</div>
	)
}

function BreakdownEntry({ agent, support }: { agent: string; support: PageSupport }) {
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
			className={classNames(styles.breakdownGrid, styles.breakdownRow)}
			tabIndex={history ? -1 : undefined}
		>
			<div className={classNames(styles.breakdownAgent)} title={`${agent} vs ${image}`}>
				{isValidImageSrc(image) ? (
					<Image
						src={image}
						className={classNames(styles.agentIcon, styles.breakdownIcon)}
					/>
				) : (
					<div className={styles.breakdownIcon}>&nbsp;</div>
				)}
				<span className={styles.breakdownAgentName}>{support.name}</span>
			</div>
			<div className={classNames(styles.breakdownAvailability)}>
				{formatAvailability(support, { unsupported: styles.breakdownUnsupported })}
				{isAvailable && support.added?.version && (
					<>
						{' '}
						<span className={styles.breakdownVersion}>v{support.added.version}</span>
					</>
				)}
			</div>
			<div>
				{isAvailable && support.usage?.global && support.usage.relative && (
					<span className={styles.breakdownUsage}>
						<Usage name={support?.name ?? agent} usage={support.usage.global} />
						{' / '}
						<Usage name={support?.name ?? agent} usage={support.usage.relative} />
					</span>
				)}
			</div>
			<CircledImage src={isAvailable ? 'check' : 'times'} />
			{history}
		</div>
	)
}

function BreakdownHistory({ agent, support }: { agent: string; support: PageSupport }) {
	if (!support.history || support.history.length === 0) {
		return null
	} else if (support.history.length === 1 && !support.history[0].added) {
		return (
			<div className={styles.breakdownHistory}>
				<div className={styles.breakdownHistoryEntry}>
					<Note icon="unsupported">No Support</Note>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.breakdownHistory}>
			{support.history.map((history, index) => (
				<BreakdownHistoryEntry
					key={index}
					agent={agent}
					support={support}
					history={history}
				/>
			))}
		</div>
	)
}

function BreakdownHistoryEntry({
	agent,
	support,
	history,
}: {
	agent: string
	support: PageSupport
	history: PageSupportHistory
}) {
	return (
		<>
			{isFullySupported(history) && history.removed && (
				<div className={styles.breakdownHistoryEntry}>
					<BreakdownHistoryEntryEvent icon={'unsupported'}>
						<div className={styles.breakdownHistoryHeader}>
							<div className={styles.breakdownHistoryAvailability}>
								{history.removed.date
									? formatDate(history.removed.date)
									: 'Unknown'}
								<>&nbsp;&ndash;&nbsp;Latest</>
							</div>
							<div className={styles.breakdownVersion}>
								v{history.removed.version}+
							</div>
						</div>
					</BreakdownHistoryEntryEvent>
					<Note>No Support, Feature Removed</Note>
				</div>
			)}
			<div className={styles.breakdownHistoryEntry}>
				<BreakdownHistoryEntryEvent
					icon={
						history.partial_implementation || history.alternative_name
							? 'alt'
							: (history.flags?.length ?? 0) > 0
							? 'flag'
							: history.prefix
							? 'prefix'
							: history.added
							? 'supported'
							: history.removed
							? 'unsupported'
							: undefined
					}
				>
					<div className={styles.breakdownHistoryHeader}>
						<div className={styles.breakdownHistoryAvailability}>
							{history.added && history.added.date
								? formatDate(history.added.date)
								: 'Unknown'}
							{(history.added?.date || history.removed?.date) && (
								<>&nbsp;&ndash;&nbsp;</>
							)}
							{history.removed?.date
								? formatDate(history.removed.date)
								: history.added?.date
								? 'Latest'
								: undefined}
						</div>
						<div className={styles.breakdownVersion}>
							{history.added?.version ? <>v{history.added.version}</> : 'Unknown'}
							{history.removed?.version ? (
								<>&nbsp;&ndash;&nbsp;v{history.removed.version}</>
							) : (
								'+'
							)}
						</div>
						<Usages
							name={support?.name ?? agent}
							usage={history.usage}
							includeTitles={false}
							className={styles.breakdownHistoryUsage}
						/>
					</div>
				</BreakdownHistoryEntryEvent>
				{isFullySupported(history) && <Note>Full Support</Note>}
				{history.prefix && (
					<Note>
						Implemented with the vendor prefix: <code>{history.prefix}</code>
					</Note>
				)}
				{history.alternative_name && (
					<Note>
						Alternate name: <code>{history.alternative_name}</code>
					</Note>
				)}
				{history.partial_implementation && <Note>Partial Support</Note>}
				{history.flags &&
					history.flags.map((flag, index) => (
						<Note key={index}>
							This feature is behind the <code>{flag.name}</code> {flag.type}{' '}
							{flag.value_to_set && (
								<>
									(needs to be set to <code>{flag.value_to_set}</code>
								</>
							)}
						</Note>
					))}
				{history.notes &&
					history.notes.map((note, index) => (
						<Note key={index}>
							<span dangerouslySetInnerHTML={{ __html: note }} />
						</Note>
					))}
			</div>
		</>
	)
}

function Note({
	icon,
	children,
}: {
	children: any
	icon?: Parameters<typeof BreakdownHistoryEntryEvent>[0]['icon']
}) {
	return (
		<BreakdownHistoryEntryEvent icon={icon}>
			<p className={styles.breakdownNote}>{children}</p>
		</BreakdownHistoryEntryEvent>
	)
}

function BreakdownHistoryEntryEvent({
	icon,
	children,
}: {
	icon?: 'supported' | 'unsupported' | 'alt' | 'prefix' | 'flag'
	children: any
}) {
	return (
		<>
			<div
				className={classNames({
					[styles.breakdownHistoryEntryBullet]: true,
					[styles.breakdownHistoryEntryBulletSimple]: !icon,
					[styles.breakdownHistoryEntryBulletIcon]: !!icon,
				})}
			>
				{icon && (
					<CircledImage
						src={
							icon === 'alt'
								? 'asterisk'
								: icon === 'flag'
								? 'flag'
								: icon === 'prefix'
								? 'prefix'
								: icon === 'supported'
								? 'check'
								: 'times'
						}
						className={styles.breakdownHistoryEntryBulletIconImage}
					/>
				)}
			</div>
			{children}
		</>
	)
}
