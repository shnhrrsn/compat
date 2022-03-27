import formatDate from '@/utils/formatters/formatDate'
import { isFullySupported, PageSupport, SupportHistory, SupportVersion } from '@compat/content'
import classNames from 'classnames'
import CircledImage from '../shared/circledImage'
import styles from './history.module.css'
import Usages from './usages'

export function BreakdownHistory({ agent, support }: { agent: string; support: PageSupport }) {
	if (!support.history || support.history.length === 0) {
		return null
	} else if (support.history.length === 1 && !support.history[0].added) {
		return (
			<div className={styles.history}>
				<div className={styles.entry}>
					<Note icon="unsupported">No Support</Note>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.history}>
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
	history: SupportHistory
}) {
	return (
		<>
			{isFullySupported(history) && history.removed && (
				<SupportRemoved history={history as any} />
			)}
			<div className={styles.entry}>
				<Event
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
					<div className={styles.header}>
						<div className={styles.availability}>
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
						<div className={styles.version}>
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
							className={styles.usage}
						/>
					</div>
				</Event>
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

function SupportRemoved({ history }: { history: SupportHistory & { removed: SupportVersion } }) {
	return (
		<div className={styles.entry}>
			<Event icon={'unsupported'}>
				<div className={styles.header}>
					<div className={styles.availability}>
						{history.removed.date ? formatDate(history.removed.date) : 'Unknown'}
						<>&nbsp;&ndash;&nbsp;Latest</>
					</div>
					<div className={styles.version}>v{history.removed!.version}+</div>
				</div>
			</Event>
			<Note>No Support, Feature Removed</Note>
		</div>
	)
}

function Event({
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
					[styles.entryBullet]: true,
					[styles.entryBulletSimple]: !icon,
					[styles.entryBulletIcon]: !!icon,
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
						className={styles.entryBulletIconImage}
					/>
				)}
			</div>
			{children}
		</>
	)
}

function Note({ icon, children }: { children: any; icon?: Parameters<typeof Event>[0]['icon'] }) {
	return (
		<Event icon={icon}>
			<p className={styles.note}>{children}</p>
		</Event>
	)
}
