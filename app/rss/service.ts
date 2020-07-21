import { Repository } from "./repository"
import { SearchResult } from "./rss"

class RssService implements Repository {
	private repo: Repository
	
	constructor(repository: Repository) {
		this.repo = repository
	}
	
	public delete = (source: string): Error => {
		return this.repo.delete(source)
	}
	
	public findAll = (): { searchResult: SearchResult, error: Error } => {
		return this.repo.findAll()
	}
	
	public findAllByCategory = (category: string): { searchResult: SearchResult, error: Error } => {
		return this.repo.findAllByCategory(category)
	}
}

export default RssService
