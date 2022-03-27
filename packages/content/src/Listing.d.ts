export type ListingMetadata = {
	self: string[]
	type: 'listing'
	title: string
	links: {
		title: string
		href: string
	}[]
}
