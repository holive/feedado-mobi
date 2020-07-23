export interface Rss {
	source: string
	title: string
	url: string
	category: string
	timestamp: number
}

export interface SearchResult {
	feeds: Array<Rss> | null
}
