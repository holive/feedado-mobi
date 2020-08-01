export interface Rss {
	_id?: string
	title: string
	subtitle?: string
	url: string
	category: string
	timestamp: number
}

export interface SearchResult {
	rsss: Array<Rss> | null
}
