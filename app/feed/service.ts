import { Repository } from "./repository"
import { Feed, SearchResult } from "./feed"

class FeedService implements Repository {
	private repo: Repository
	
	constructor(repository: Repository) {
		this.repo = repository
	}
	
	public create = (feed: Feed): Error | null => {
		if (!this.validateURL(feed.source)) return new Error('invalid url')
		
		if (feed.source[feed.source.length - 1] == '/') feed.source = feed.source.slice(0, -1)
		
		const alreadyExists = this.repo.findBySource(feed.source)
		if (alreadyExists.feed) return new Error('source already exists')
		
		return this.repo.create(feed)
	}
	
	public update = (feed: Feed): Error | null => {
		return this.repo.update(feed)
	}
	
	public delete = (source: string): Error | null => {
		return this.repo.delete(source)
	}
	
	public findAll = (): { searchResult: SearchResult, error: Error | null } => {
		return this.repo.findAll()
	}
	
	public findBySource = (source: string): { feed: Feed, error: Error | null } => {
		return this.repo.findBySource(source)
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
