import { SearchResult } from "./rss"

export interface Repository {
	delete: (source: string) => Error
	findAllByCategory: (category: string) => { searchResult: SearchResult, error: Error }
	findAll: () => { searchResult: SearchResult, error: Error }
}
