import { Rss, SearchResult } from "./rss"
import { NError } from "../variables";

export interface Repository {
	create: (rss: Rss) => Promise<NError>
	delete: (url: string) => Promise<NError>
	findAllByCategory: (category: string) => Promise<{ searchResult: SearchResult }>
	findAll: () => Promise<{ searchResult: SearchResult }>
}
