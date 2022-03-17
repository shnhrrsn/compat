import Image, { isValidImageSrc } from '@/components/image'
import classNames from 'classnames'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import getAllPages from '../utils/getAllPages'
import { getPage, Page, PageSupport } from '../utils/getPage'
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
				<div className={styles.browsers}>
					{[...browsers, ...(props.section === 'javascript' ? servers : [])].map(
						browser => (
							<Browser
								key={browser}
								browser={browser}
								support={props.support[browser]}
							/>
						),
					)}
				</div>
				<h3>Version Breakdown</h3>
			</article>
		</Layout>
	)
}

function Browser({ browser, support }: { browser: string; support: PageSupport | null }) {
	return (
		<div
			className={classNames({
				[styles.browser]: true,
				[styles.browserUnsupported]: !support?.added?.date,
				[styles.browserLow]: support?.usage.relative && support.usage.relative < 0.6,
				[styles.browserMedium]:
					support?.usage.relative &&
					support.usage.relative >= 0.6 &&
					support.usage.relative < 0.8,
				[styles.browserHigh]: support?.usage.relative && support.usage.relative >= 0.8,
			})}
		>
			{isValidImageSrc(browser) && <Image src={browser} className={styles.browserIcon} />}
			<span className={styles.browserName}>{support?.name ?? browser}</span>
			<span className={styles.browserReleaseDate}>
				{support?.added?.date
					? new Date(support.added.date * 1000).toLocaleDateString(undefined, {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
					  })
					: support?.added
					? '???'
					: 'Unsupported'}
			</span>
			{support?.added && (
				<span className={styles.browserVersion}>v{support.added.version}</span>
			)}
			{support?.usage.global && support?.usage.relative && (
				<span className={styles.browserUsage}>
					<span
						title={`Global share of ${
							support?.name ?? browser
						} users running a supported version.`}
					>
						{support.usage.global.toLocaleString(undefined, {
							style: 'percent',
						})}
					</span>
					{' / '}
					<span
						title={`Relative share of ${
							support?.name ?? browser
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
