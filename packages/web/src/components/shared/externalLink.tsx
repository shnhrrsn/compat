export default function ExternalLink({
	children,
	...props
}: {
	href: string
	title?: string
	className?: string
	children: any
}) {
	return (
		<a {...props} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	)
}
