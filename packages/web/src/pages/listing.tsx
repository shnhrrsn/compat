import Document from '@/components/shared/document'
import { ListingMetadata } from '@compat/content'
import Link from 'next/link'

export default function Listing({ children, ...props }: ListingMetadata) {
	return (
		<Document {...props}>
			{props.content?.intro && <h3>Contents</h3>}
			<ul>
				{children.map(child => (
					<li key={child.href}>
						<Link href={child.href}>
							<a>{child.title}</a>
						</Link>
					</li>
				))}
			</ul>
		</Document>
	)
}
