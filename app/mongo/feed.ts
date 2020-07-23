import { Repository } from "../feed/repository";
import { Feed, SearchResult, Section } from "../feed/feed";
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
	
	public delete = async (source: string): Promise<NError> => {
		const removed = await this.feedCollection.removeAsync({ source: source }, {})
		// erase all this.feedCollection.removeAsync({}, { multi: true })
		
		if (removed != 1) return new Error('could not remove feed')
		return null
	}
	
	public findAll = async (): Promise<{ searchResult: SearchResult }> => {
		const result = await this.feedCollection.findAsync({})
		
		return {
			searchResult: {
				feeds: result as Array<Feed>,
			}
		}
	}
	
	public update = async (feed: Feed): Promise<NError> => {
		return null
	}
}

export const newMongoFeedRepo = () => {
	return new MongoFeedRepo(newCollection('feed'))
}
