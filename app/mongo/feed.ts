import { Repository } from "../feed/repository";
import { Feed, SearchResult } from "../feed/feed";
import { MongoDataStore, newCollection } from "./client";
import { NError } from "../variables";

class MongoFeedRepo implements Repository {
	private feedCollection: MongoDataStore
	
	constructor(feedCollection: MongoDataStore) {
		this.feedCollection = feedCollection
	}
	
	public create = async (feed: Feed): Promise<NError> => {
		const newDoc = await this.feedCollection.insertAsync(feed)
		
		if (newDoc._id) return null
		
		return new Error('could not create the feed')
	}
	
	public update = async (feed: Feed): Promise<NError> => {
		const result = await this.feedCollection.updateAsync({ _id: feed._id }, feed, {})
		
		if (result as unknown as number != 1) return new Error('could not update feed')
		return null
	}
	
	public delete = async (id: string): Promise<NError> => {
		const removed = await this.feedCollection.removeAsync({ _id: id }, {})
		// erase all this.feedCollection.removeAsync({}, { multi: true })

		if (removed != 1) return new Error('could not remove feed')
		return null
	}
	
	public findBySource = async (source: string): Promise<{ feed: Feed, error: NError }> => {
		const result = await this.feedCollection.findOneAsync({ source: source })
		
		if (result) {
			return {
				error: null,
				feed: result as Feed,
			}
		}
		
		return {
			error: new Error('feed not found'),
			feed: {} as Feed,
		}
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }> => {
		const result = await this.feedCollection.findAsync({})
		
		return {
			searchResult: {
				feeds: result as Array<Feed>,
			}
		}
	}
	
	public findAllCategories = (callback: (categories: Array<{ [key: string]: string }>) => void) => {
		this.feedCollection.find({}, { _id: 0, category: 1 }, (err, docs) => {
			if (err?.message) console.warn(err)
			
			const deduplicated: {[key: string]: {}} = {}
			docs.forEach((v) => deduplicated[v.category] = {label: v.category, value: v.category})
			
			let result: Array<{ [key: string]: string }> = []
			Object.keys(deduplicated).forEach((v) => result.push(deduplicated[v]))
			
			callback(result)
		})
	}
	
	public findAllByCategory = async (category: string): Promise<{ searchResult: SearchResult }> => {
		const result = await this.feedCollection.findAsync({category: category})
		
		return {
			searchResult: {
				feeds: result as Array<Feed>,
			}
		}
	}
}

export const newMongoFeedRepo = () => {
	return new MongoFeedRepo(newCollection('feed'))
}
