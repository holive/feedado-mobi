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
		
		feed.category = feed.category.toLowerCase()
		const newFeed: object = this.convertFeedSectionsMapToArray(feed)
		
		return await this.repo.create(newFeed as Feed)
	}
	
	public delete = async (id: string): Promise<NError> => {
		return await this.repo.delete(id)
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }> => {
		return await this.repo.findAll()
	}
	
	public update = async (feed: Feed): Promise<NError> => {
		const newFeed: object = this.convertFeedSectionsMapToArray(feed)
		return await this.repo.update(newFeed as Feed)
	}
	
	public findBySource = async (source: string): Promise<{ feed: Feed, error: NError }> => {
		return this.repo.findBySource(source)
	}
	
	public findAllCategories = async (setCategories: (categories: Array<{ [key: string]: string }>) => void): Promise<void> => {
		this.repo.findAllCategories(setCategories)
	}
	
	public findAllByCategory = async (category: string): Promise<{ searchResult: SearchResult }> => {
		return this.repo.findAllByCategory(category)
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
	
	private convertFeedSectionsMapToArray = (feed: Feed): object => {
		const newFeed: object = {...feed}
		const newSections: Array<object> = []
		
		Array.from(feed.sections).map((v, i) =>	newSections.push(v[1]))
		
		// @ts-ignore
		newFeed.sections = newSections
		return newFeed
	}
}

export default FeedService
