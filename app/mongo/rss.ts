import { Repository } from "../rss/repository";
import { SearchResult } from "../rss/rss";
import { newCollection } from "./client";

class MongoRssRepo implements Repository {
	private rssCollection: any
	
	constructor(rssCollection: any) {
		this.rssCollection = rssCollection
	}
	
	delete(source: string): Error {
		return new Error();
	}
	
	findAll(): { searchResult: SearchResult; error: Error } {
		return { error: new Error(), searchResult: undefined };
	}
	
	findAllByCategory(category: string): { searchResult: SearchResult; error: Error } {
		return { error: new Error(), searchResult: undefined };
	}
	
}

export const newMongoRssRepo = () => {
	return new MongoRssRepo(newCollection('rss'))
}
