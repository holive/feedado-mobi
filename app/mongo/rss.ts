import { Repository } from "../rss/repository";
import { SearchResult } from "../rss/rss";

const Datastore = require('react-native-local-mongodb')

const newRssCollection = () => {
	return new Datastore({ filename: 'rss', autoload: true })
}

class MongoRssRepo implements Repository {
	private rssCollection: any
	
	constructor(rssCollection: any) {
		this.rssCollection = rssCollection
	}
	
	delete(source: string): Error {
		return undefined;
	}
	
	findAll(): { searchResult: SearchResult; error: Error } {
		return { error: undefined, searchResult: undefined };
	}
	
	findAllByCategory(category: string): { searchResult: SearchResult; error: Error } {
		return { error: undefined, searchResult: undefined };
	}
	
}

export const newMongoRssRepo = () => {
	return new MongoRssRepo(newRssCollection())
}
