export const MAX_FEEDS_BY_CATEGORY = 'max_feeds_by_category'

export interface Config {
	_id?: string
	[MAX_FEEDS_BY_CATEGORY]: string
}

export interface SearchResult {
	config: Config | null
}

