import React, { JSXElementConstructor } from 'react'

export default function isComponent<Element extends JSXElementConstructor<any>>(
	child: React.ReactElement<any, any>,
	type: Element,
): child is React.ReactElement<any, Element> {
	if (process.env.NODE_ENV === 'production') {
		return child.type === type
	}

	return child.type === React.createElement(type).type
}
