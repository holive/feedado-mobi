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
	
	public delete = async (source: string): Promise<NError> => {
		const removed = await this.feedCollection.removeAsync({ source: source }, {})
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
	
	public findAllCategories = (setCategories: (categories: Array<{ [key: string]: string }>) => void) => {
		this.feedCollection.find({}, { _id: 0, category: 1 }, (err, docs) => {
			if (err?.message) console.warn(err)
			
			let result: Array<{ [key: string]: string }> = []
			docs.forEach((v) => result.push({ label: v.category, value: v.category}))
			
			setCategories(result)
		})
	}
}

export const newMongoFeedRepo = () => {
	return new MongoFeedRepo(newCollection('feed'))
}
