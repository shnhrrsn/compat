import Agents from '@/components/page/agents'
import SafeToUse from '@/components/page/safeToUse'
import Layout, { siteTitle } from '@/components/shared/layout'
import getAllPages from '@/utils/getAllPages'
import { getPage, Page } from '@/utils/getPage'
import Head from 'next/head'

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

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
				<SafeToUse title={props.title} usage={props.usage} />
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
