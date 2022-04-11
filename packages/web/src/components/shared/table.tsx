import isComponent from '@/utils/isComponent'
import classNames from 'classnames'
import React, { isValidElement, ReactNode } from 'react'
import styles from './table.module.css'

type GridProps = { gridClassName: string } | { grid: string }

export default function Table({
	className,
	children,
	...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & GridProps) {
	const array = React.Children.toArray(children).filter(isValidElement)
	const headers = array.filter(child => isComponent(child, TableHeaders))
	const rows = array.filter(child => !isComponent(child, TableHeaders))
	return (
		<div
			className={classNames(styles.table, className)}
			{...{ ...props, grid: undefined, gridClassName: undefined }}
		>
			{headers.length === 1 && withGridProps(headers[0], props)}
			<div className={styles.rows}>
				{rows.map((row, index) => withGridProps(row, props, { key: index }))}
			</div>
		</div>
	)
}

function withGridProps(element: JSX.Element, grid: GridProps, props: Record<string, any> = {}) {
	return React.cloneElement(element, {
		...props,
		className: classNames(
			element.props.className,
			'gridClassName' in grid ? grid.gridClassName : undefined,
		),
		style: {
			...(element.props.style ?? {}),
			...('grid' in grid ? { gridTemplateColumns: grid.grid } : {}),
		},
	})
}

export function TableHeaders({
	className,
	children,
	...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div className={classNames(styles.headers, className)} {...props}>
			{children}
		</div>
	)
}

export function TableHeader({
	className,
	...props
}: {
	className?: string
} & ({ children: ReactNode } | { title: string })) {
	return (
		<div className={classNames(styles.header, className)}>
			{'children' in props && props.children}
			{'title' in props && props.title}
		</div>
	)
}

export function TableRow({
	className,
	children,
	...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
	return (
		<div className={classNames(styles.row, className)} {...props}>
			{children}
		</div>
	)
}
