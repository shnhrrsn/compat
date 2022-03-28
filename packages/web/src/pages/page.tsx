import Agents from '@/components/page/agents'
import Breakdown from '@/components/page/breakdown'
import SafeToUse from '@/components/page/safeToUse'
import { DeprecatedCard, ExperimentalCard } from '@/components/shared/card'
import Document from '@/components/shared/document'
import { PageMetadata } from '@compat/content'

const browsers = ['chrome', 'safari', 'edge', 'firefox']
const servers = ['nodejs', 'deno']

export default function Page(props: PageMetadata) {
	return (
		<Document {...props}>
			<h3>Safe to Use</h3>
			{props.status?.experimental && <ExperimentalCard />}
			{props.status?.deprecated && <DeprecatedCard />}
			<SafeToUse title={props.title} usage={props.usage} />
			<h3>Browsers</h3>
			<Agents agents={browsers} support={props.support} />
			{props.self[0] === 'javascript' && (
				<>
					<h3>Servers</h3>
					<Agents agents={servers} support={props.support} />
				</>
			)}
			<h3>Version Breakdown</h3>
			<Breakdown support={props.support} />
		</Document>
	)
}
