import Image, { isValidImageSrc } from '@/components/shared/image'
import Layout, { siteTitle } from '@/components/shared/layout'
import getAllPages from '@/utils/getAllPages'
import { getPage, Page, PageSupport } from '@/utils/getPage'
import classNames from 'classnames'
import Head from 'next/head'
import styles from './page.module.css'

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Home(props: Page) {
	const safeToUse = props.usage >= 0.8
	return (
		<Layout home>
			<Head>
				<title>
					{props.title} | {siteTitle}
				</title>
			</Head>

			<article>
				<h1>{props.title}</h1>
				{props.html && <div dangerouslySetInnerHTML={{ __html: props.html }} />}
				{(props.urls.mdn || props.urls.spec) && (
					<cite>
						{props.urls.mdn && (
							<a href={props.urls.mdn} target="_blank">
								Read More at MDN Docs
							</a>
						)}
						{props.urls.spec && (
							<a href={props.urls.spec} target="_blank">
								View Spec
							</a>
						)}
					</cite>
				)}
				<h3>Safe to Use</h3>
				<div className={styles.safeToUse}>
					<div
						className={classNames(
							styles.safeToUseIcon,
							safeToUse ? styles.safeToUseIconSafe : styles.safeToUseIconUnsafe,
						)}
					>
						<Image src={safeToUse ? 'check' : 'times'} />
					</div>
					<div className={styles.safeToUseText}>
						<p>
							<code>{props.title}</code> is{' '}
							{!safeToUse ? (
								<strong>not safe</strong>
							) : props.usage < 0.9 ? (
								<strong>mostly safe</strong>
							) : (
								'considered safe'
							)}{' '}
							to use.
						</p>
						<p>
							It’s supported by{' '}
							<strong
								className={
									safeToUse
										? styles.safeToUseTextSafe
										: styles.safeToUseTextUnsafe
								}
							>
								{props.usage.toLocaleString(undefined, { style: 'percent' })}
							</strong>{' '}
							of global browsers.
						</p>
					</div>
				</div>
				<h3>Browsers</h3>
				<Agents agents={browsers} support={props.support} />
				{props.section === 'javascript' && (
					<>
						<h3>Servers</h3>
						<Agents agents={servers} support={props.support} />
					</>
				)}
				<h3>Version Breakdown</h3>
			</article>
		</Layout>
	)
}

function Agents({ agents, support }: { agents: string[]; support: Record<string, PageSupport> }) {
	return (
		<div className={styles.agents}>
			{agents.map(agent => (
				<Agent key={agent} agent={agent} support={support[agent]} />
			))}
		</div>
	)
}

function Agent({ agent, support }: { agent: string; support: PageSupport | null }) {
	const isRemoved = support && support.removed ? true : false
	return (
		<div
			className={classNames({
				[styles.agent]: true,
				[styles.agentUnsupported]: isRemoved || !support?.added?.date,
				[styles.agentLow]:
					!isRemoved && support?.usage.relative && support.usage.relative < 0.6,
				[styles.agentMedium]:
					!isRemoved &&
					support?.usage.relative &&
					support.usage.relative >= 0.6 &&
					support.usage.relative < 0.8,
				[styles.agentHigh]:
					!isRemoved && support?.usage.relative && support.usage.relative >= 0.8,
			})}
		>
			{isValidImageSrc(agent) && <Image src={agent} className={styles.agentIcon} />}
			<span className={styles.agentName}>{support?.name ?? agent}</span>
			<span className={styles.agentReleaseDate}>
				{!isRemoved && support?.added?.date
					? new Date(support.added.date * 1000).toLocaleDateString(undefined, {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
					  })
					: !isRemoved && support?.added
					? '???'
					: 'Unsupported'}
			</span>
			{!isRemoved && support?.added && (
				<span className={styles.agentVersion}>v{support.added.version}</span>
			)}
			{!isRemoved && support?.usage.global && support?.usage.relative && (
				<span className={styles.agentUsage}>
					<span
						title={`Global share of ${
							support?.name ?? agent
						} users running a supported version.`}
					>
						{support.usage.global.toLocaleString(undefined, {
							style: 'percent',
						})}
					</span>
					{' / '}
					<span
						title={`Relative share of ${
							support?.name ?? agent
						} users running a supported version.`}
					>
						{support.usage.relative.toLocaleString(undefined, {
							style: 'percent',
						})}
					</span>
				</span>
			)}
		</div>
	)
}

export async function getStaticPaths() {
	return {
		paths: await getAllPages(),
		fallback: false,
	}
}

export async function getStaticProps({ params }: any) {
	return {
		props: await getPage(params.page),
	}
}
