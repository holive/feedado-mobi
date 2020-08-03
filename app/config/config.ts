export const MAX_FEEDS_BY_CATEGORY = 'max_feeds_by_category'
export const NEW_INSTALLATION = 'new_installation'

export interface Config {
	_id?: string
	[MAX_FEEDS_BY_CATEGORY]: string
	[NEW_INSTALLATION]: boolean
}

export interface SearchResult {
	config: Config | null
}
