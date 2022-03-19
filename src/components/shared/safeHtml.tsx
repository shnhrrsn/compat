import Link from 'next/link'
import { createElement, Fragment, useEffect, useState } from 'react'
import rehypeReact from 'rehype-react'
import { unified } from 'unified'
import { Data, Node, NodeData, Parent } from 'unist'
import ExternalLink from './externalLink'
import Image from './image'

export type SafeHtmlAst = {
	id: string
	tree: Parent<any, NodeData<Node<Data>>> & { type: 'root' }
}

export default function SafeHtml({ ast }: { ast: SafeHtmlAst }) {
	const [content, setContent] = useState(Fragment as any)

	useEffect(() => {
		setContent(
			unified()
				.use(rehypeReact, { createElement: $createElement, Fragment })
				.stringify(ast.tree),
		)
	}, [ast.id])

	return content
}

function $createElement(type: any, props?: any, ...args: any[]) {
	if (type === 'icon') {
		switch (props?.src) {
			case 'nonstandard':
				return <Image src="warning" inline />
			case 'experimental':
				return <Image src="experimental" inline />
		}

		return undefined
	} else if (type !== 'a') {
		return createElement(type, props, ...args)
	} else if ('internal' in props) {
		const { href, key, ...linkProps } = props
		delete linkProps.internal

		return (
			<Link href={href} key={key}>
				{createElement('a', linkProps, ...args)}
			</Link>
		)
	}

	if (typeof props.href === 'string' && props.href.startsWith('/')) {
		props.href = `https://developer.mozilla.org${props.href}`
	}

	return createElement(ExternalLink, props, ...args)
}
