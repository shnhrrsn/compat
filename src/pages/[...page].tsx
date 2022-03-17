import Agents from '@/components/page/agents'
import Image from '@/components/shared/image'
import Layout, { siteTitle } from '@/components/shared/layout'
import getAllPages from '@/utils/getAllPages'
import { getPage, Page } from '@/utils/getPage'
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
				<table>
					<thead>
						<th>Browser</th>
						<th>Full Support</th>
						<th>Notes</th>
					</thead>
					<tbody>
						{Object.entries(props.support).map(([browser, support]) => (
							<tr key={browser}>
								<td>{support.name}</td>
								<td>{support.added?.version}</td>
								<td>
									{support.notes?.map((note, index) => (
										<p key={index} dangerouslySetInnerHTML={{ __html: note }} />
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<h3>Debug</h3>
				<pre>{JSON.stringify(props, null, 2)}</pre>
			</article>
		</Layout>
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
