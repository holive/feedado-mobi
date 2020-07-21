import { Feed, SearchResult } from "./feed"

export interface Repository {
	create: (feed: Feed) => Error
	update: (feed: Feed) => Error
	delete: (source: string) => Error
	findBySource: (source: string) => { feed: Feed, error: Error }
	findAll: () => { searchResult: SearchResult, error: Error }
}
