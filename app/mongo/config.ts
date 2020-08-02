import { MongoDataStore, newCollection } from "./client";
import { NError } from "../variables";
import { Repository } from "../config/repository";
import { Config } from "../config/config";

class MongoConfigRepo implements Repository {
	private configCollection: MongoDataStore
	
	constructor(configCollection: MongoDataStore) {
		this.configCollection = configCollection
	}
	
	public findAll = async (): Promise<Config> => {
		const result = await this.configCollection.findAsync({})
		return result[0] as Config
	}
	
	public update = async (config: Config): Promise<NError> => {
		await this.configCollection.removeAsync({}, { multi: true })
		
		const newDoc = await this.configCollection.insertAsync(config)
		if (newDoc._id) return null
		return new Error('could not update the config')
		
	}
}

export const newMongoConfigRepo = () => {
	return new MongoConfigRepo(newCollection('config'))
}
