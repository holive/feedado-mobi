import { Feed, SearchResult } from "./feed"

export interface Repository {
	create: (feed: Feed) => Promise<Error | null>
	update: (feed: Feed) => Error | null
	delete: (source: string) => Error | null
	findBySource: (source: string) => { feed: Feed, error: Error | null }
	findAll: () => { searchResult: SearchResult, error: Error | null }
}
