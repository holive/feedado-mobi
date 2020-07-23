export interface Rss {
	source: string
	title: string
	url: string
	category: string
	timestamp: number
}

export interface SearchResult {
	rsss: Array<Rss> | null
}
