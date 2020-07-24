import { Feed, SearchResult } from "./feed"
import { NError } from "../variables";

export interface Repository {
	create: (feed: Feed) => Promise<NError>
	update: (feed: Feed) => Promise<NError>
	delete: (source: string) => Promise<NError>
	findBySource: (source: string) => Promise<{ feed: Feed, error: NError }>
	findAll: () => Promise<{ searchResult: SearchResult }>
	findAllCategories: (setCategories: (categories: Array<{ [key: string]: string }>) => void) => void
}
