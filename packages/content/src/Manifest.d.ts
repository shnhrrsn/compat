import { CommitInfo } from './Page.js'

export type ManifestListing = {
	type: 'listing'
	href: string
	title: string
}

export type ManifestPage = {
	type: 'page'
	href: string
	title: string
	mdn?: string
	commit?: CommitInfo
}

export type ManifestEntry = ManifestListing | ManifestPage
export type Manifest = ManifestEntry[]
