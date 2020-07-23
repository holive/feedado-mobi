import { Repository } from "../rss/repository";
import { Rss, SearchResult } from "../rss/rss";
import { MongoDataStore, newCollection } from "./client";
import { NError } from "../variables";

class MongoRssRepo implements Repository {
	private rssCollection: MongoDataStore
	
	constructor(rssCollection: MongoDataStore) {
		this.rssCollection = rssCollection
	}
	
	public create = async (rss: Rss): Promise<NError> => {
		const result = await this.rssCollection.updateAsync({ url: rss.url }, rss, { upsert: true })
		
		if (result as unknown as number != 1) return new Error('could not create rss')
		return null
	}
	
	public delete = async (url: string): Promise<NError> =>  {
		const removed = await this.rssCollection.removeAsync({ url: url }, {})
		// erase all this.rssCollection.removeAsync({}, { multi: true })
		
		if (removed != 1) return new Error('could not remove rss')
		return null
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }>  => {
		const result = await this.rssCollection.findAsync({})
		
		return {
			searchResult: {
				rsss: result as Array<Rss>,
			}
		}
	}
	
	public findAllByCategory = async (category: string): Promise<{ searchResult: SearchResult }>  => {
		const result = await this.rssCollection.findAsync({ category: category })
		
		return {
			searchResult: {
				rsss: result as Array<Rss>,
			}
		}
	}
}

export const newMongoRssRepo = () => {
	return new MongoRssRepo(newCollection('rss'))
}
