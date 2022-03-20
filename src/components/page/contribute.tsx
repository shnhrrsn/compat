import { PageProps } from '@/pages/page'
import useHydrated from '@/utils/hooks/useHydrated'
import ExternalLink from '../shared/externalLink'

export default function Contribute(props: PageProps) {
	const isHydrated = useHydrated()

	return (
		<ul>
			{isHydrated && (
				<li>
					<ExternalLink href={getCompatDataNewIssueURL(props)}>
						Report problems with compatibility data on GitHub
					</ExternalLink>
				</li>
			)}
			{props.urls.mdn && (
				<>
					<li>
						<ExternalLink href={getDocsNewIssueURL(props)}>
							Report problems with docs on GitHub
						</ExternalLink>
					</li>
					{props.urls.github && (
						<li>
							<ExternalLink href={props.urls.github}>
								Edit docs on GitHub
							</ExternalLink>
						</li>
					)}
				</>
			)}
		</ul>
	)
}

// Source: https://github.com/mdn/yari/blob/dbaddf2c7578cde358dd974b35587d22b63d94dd/client/src/document/ingredients/browser-compatibility-table/index.tsx
function getCompatDataNewIssueURL(props: PageProps) {
	const url = 'https://github.com/mdn/browser-compat-data/issues/new'
	const sp = new URLSearchParams()
	const body = `
<!-- Tips: where applicable, specify browser name, browser version, and mobile operating system version -->

#### What information was incorrect, unhelpful, or incomplete?

#### What did you expect to see?

#### Did you test this? If so, how?


<!-- Do not make changes below this line -->
<details>
<summary>MDN page report details</summary>

* Query: \`${props.query}\`
* MDN URL: ${props.urls.mdn}
* Report started: ${new Date(Math.floor(Date.now() / 60_000) * 60_000).toISOString()}

</details>
		`.trim()
	sp.set('body', body)
	sp.set('title', `${props.query} - <PUT TITLE HERE>`)
	return `${url}?${sp.toString()}`
}

// Source: https://github.com/mdn/yari/blob/dae87b2b0e92c55ab9f7be8fabac3c4770bf43b6/client/src/document/on-github.tsx
function getDocsNewIssueURL(props: PageProps) {
	const labelPrefixes: Record<string, string> = {
		javascript: 'JS',
		css: 'CSS',
		html: 'HTML',
		api: 'WebAPI',
		http: 'HTTP',
		svg: 'SVG',
		mathml: 'MathML',
	}

	const url = 'https://github.com/mdn/content/issues/new'
	const sp = new URLSearchParams()
	const body = `
MDN URL: ${props.urls.mdn}

#### What information was incorrect, unhelpful, or incomplete?


#### Specific section or headline?


#### What did you expect to see?


#### Did you test this? If so, how?


<!-- Do not make changes below this line -->
<details>
<summary>MDN Content page report details</summary>

* Folder: \`${props.urls.folder}\`
* MDN URL: ${props.urls.mdn}
* GitHub URL: ${props.urls.github}
* Last commit: https://github.com/mdn/content/commit/${props.commit}
* Document last modified: ${props.lastModified ?? '*date not known*'}

</details>
			`.trim()
	sp.set('body', body)

	const maxLength = 50
	const titleShort =
		props.title!.length > maxLength ? `${props.title!.slice(0, maxLength)}…` : props.title!
	sp.set('title', `Issue with "${titleShort}": (short summary here please)`)

	sp.set(
		'labels',
		['needs-triage', `Content:${labelPrefixes[props.section] ?? 'Other'}`].join(','),
	)

	return `${url}?${sp.toString()}`
}
