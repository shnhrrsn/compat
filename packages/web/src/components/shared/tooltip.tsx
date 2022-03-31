import classNames from 'classnames'
import React from 'react'
import styles from './tooltip.module.css'

export default function Tooltip({
	title,
	children,
}: {
	title: string | JSX.Element
	children: JSX.Element | string
}) {
	const child =
		typeof children === 'string' ? <span>{children}</span> : React.Children.only(children)
	const grandchildren = Array.isArray(child.props.children)
		? child.props.children
		: child.props.children
		? [child.props.children]
		: []

	return React.cloneElement(child, {
		'aria-label': title,
		'className': classNames(child.props.className, styles.container),
		'children': [...grandchildren, <TooltipContent title={title} />],
	})
}

function TooltipContent({ title }: { title: string | JSX.Element }) {
	return (
		<span className={styles.tooltip}>
			<span className={styles.indicator} />
			<span className={styles.content}>{title}</span>
		</span>
	)
}
