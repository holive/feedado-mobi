import { Repository } from "./repository"
import { Rss, SearchResult } from "./rss"
import { Feed } from "../feed/feed";
import { NError } from "../variables";

class RssService {
	private repo: Repository
	
	constructor(repository: Repository) {
		this.repo = repository
	}
	
	public create = async (rss: Rss): Promise<NError> => {
		return await this.repo.create(rss)
	}
	
	public delete = async (id: string): Promise<NError> => {
		return await this.repo.delete(id)
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }> => {
		return await this.repo.findAll()
	}
	
	public findAllByCategory = async (category: string): Promise<{ searchResult: SearchResult }> => {
		const result = await this.repo.findAllByCategory(category)
		
		result.searchResult.rsss?.sort((a, b) => b['timestamp']-a['timestamp'])
		
		return result
	}
}

export default RssService
