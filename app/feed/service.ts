/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';
import { Repository } from "./repository"
import { Feed, SearchResult } from "./feed"
import { NError } from "../variables";

class FeedService {
	private repo: Repository
	
	constructor(repository: Repository) {
		this.repo = repository
	}
	
	public create = async (feed: Feed): Promise<NError> => {
		if (!this.validateURL(feed.source)) return new Error('invalid url')

		if (feed.source[feed.source.length - 1] == '/') feed.source = feed.source.slice(0, -1)
		
		const found = await this.repo.findBySource(feed.source)
		if (found.feed.source) return new Error('source already exists')
		
		const newFeed: object = this.convertFeedSectionsMapToArray(feed)
		return await this.repo.create(newFeed as Feed)
	}
	
	public delete = async (source: string): Promise<NError> => {
		return await this.repo.delete(source)
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }> => {
		return await this.repo.findAll()
	}
	
	public update = async (feed: Feed): Promise<NError> => {
		const newFeed: object = this.convertFeedSectionsMapToArray(feed)
		return await this.repo.update(newFeed as Feed)
	}
	
	private convertFeedSectionsMapToArray = (feed: Feed): object => {
		const newFeed: object = {...feed}
		const newSections: Array<object> = []
		
		Array.from(feed.sections).map((v, i) =>	newSections.push(v[1]))
		
		// @ts-ignore
		newFeed.sections = newSections
		return newFeed
	}
	
	public findBySource = async (source: string): Promise<{ feed: Feed, error: NError }> => {
		return this.repo.findBySource(source)
	}
	
	public findAllCategories = async (setCategories: (categories: Array<{ [key: string]: string }>) => void): Promise<void> => {
		this.repo.findAllCategories(setCategories)
	}
	
	private validateURL = (source: string): boolean => {
		let url
		try {
			url = new URL(source)
		} catch (_) {
			return false
		}
		
		return url.protocol === "http:" || url.protocol === "https:"
	}
}

export default FeedService
