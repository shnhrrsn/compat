export default function ExternalLink({
	children,
	...props
}: {
	href?: string
	title?: string
	className?: string
	children: any
}) {
	if (!props.href) {
		return <span className={props.className}>{children}</span>
	}

	return (
		<a {...props} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	)
}
