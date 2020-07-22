import { Repository } from "../feed/repository";
import { Feed, SearchResult, Section } from "../feed/feed";

const Datastore = require('react-native-local-mongodb')

const newFeedCollection = () => {
	return new Datastore({ filename: 'feed', autoload: true })
}

class MongoFeedRepo implements Repository {
	private feedCollection: any
	
	constructor(feedCollection: any) {
		this.feedCollection = feedCollection
	}
	
	public create = async (feed: Feed): Promise<Error | null> => {
		let error: Error | null
		await this.feedCollection.insert(feed, async (err: Error | null, newDoc: any) => error = err)
		
		return error
	}
	
	delete(source: string): Error {
		return new Error()
	}
	
	findAll(): { searchResult: SearchResult, error: Error } {
		const searchResult = {
			feeds: [
				{
					source: 'string',
					description: 'string',
					category: 'string',
					sections: [
						{
							section_selector: 'string',
							title_selector: 'string',
							title_must_contain: 'string',
							subtitle_selector: 'string',
							subtitle_must_contain: 'string',
							url_selector: 'string'
						}
					]
				}
			]
		}
		
		return {
			error: new Error(),
			searchResult: searchResult,
		}
	}
	
	findBySource(source: string): { feed: Feed, error: Error } {
		return {
			error: new Error(),
			feed: {
				source: 'string',
				description: 'string',
				category: 'string',
				sections: [
					{
						section_selector: 'string',
						title_selector: 'string',
						title_must_contain: 'string',
						subtitle_selector: 'string',
						subtitle_must_contain: 'string',
						url_selector: 'string'
					}
				]
			}
		}
	}
	
	update(feed: Feed): Error {
		return new Error()
	}
}

export const newMongoFeedRepo = () => {
	return new MongoFeedRepo(newFeedCollection())
}
