import Image, { isValidImageSrc } from '@/components/image'
import classNames from 'classnames'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import getAllPages from '../utils/getAllPages'
import { getPage, Page } from '../utils/getPage'
import styles from './page.module.css'

type TypeWithGeneric<T> = Promise<T>
type extractGeneric<Type> = Type extends TypeWithGeneric<infer X> ? X : never

const browsers = ['chrome', 'safari', 'edge', 'firefox', 'nodejs']

export default function Home(props: Page) {
	return (
		<Layout home>
			<Head>
				<title>
					{props.title} | {siteTitle}
				</title>
			</Head>

			<article>
				<h1>{props.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: props.html }} />
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
				<h3>Browsers</h3>
				<div className={styles.browsers}>
					{browsers.map(browser => (
						<Browser key={browser} browser={browser} support={props.support[browser]} />
					))}
				</div>
				<h3>Version Breakdown</h3>
			</article>
		</Layout>
	)
}

function Browser({ browser, support }: { browser: string; support: Page['support']['x'] | null }) {
	return (
		<div
			className={classNames({
				[styles.browser]: true,
				[styles.browserLow]:
					!support?.release_date_added ||
					(support?.usage.relative && support.usage.relative < 0.6),
				[styles.browserMedium]: support?.usage.relative && support.usage.relative < 0.8,
				[styles.browserHigh]: support?.usage.relative && support.usage.relative >= 0.8,
			})}
		>
			{isValidImageSrc(browser) && <Image src={browser} className={styles.browserIcon} />}
			<span className={styles.browserName}>{support?.name ?? browser}</span>
			<span className={styles.browserReleaseDate}>
				{support?.release_date_added
					? new Date(support.release_date_added! * 1000).toLocaleDateString(undefined, {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
					  })
					: 'Unsupported'}
			</span>
			{support?.version_added && (
				<span className={styles.browserVersion}>v{support.version_added}</span>
			)}
			{support?.usage.global && support?.usage.relative && (
				<span className={styles.browserUsage}>
					{support.usage.global.toLocaleString(undefined, {
						style: 'percent',
					})}
					{' / '}
					{support.usage.relative.toLocaleString(undefined, {
						style: 'percent',
					})}
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
