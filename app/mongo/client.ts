import AsyncStorage from '@react-native-community/async-storage'
import {
	Query,
	MongoDocument,
	RemoveOptions,
	UpdateOptions,
	Projection, Callback
} from 'react-native-local-mongodb'

const Datastore = require('react-native-local-mongodb')

export const newCollection = (filename: string) => {
	return new Datastore({ filename: filename, storage: AsyncStorage, autoload: true })
}

export interface MongoDataStore {
	findAsync: (query: Query) => Promise<MongoDocument[]>
	findOneAsync: (query: Query) => Promise<MongoDocument>
	insertAsync: (newDoc: MongoDocument) => Promise<MongoDocument>
	updateAsync: (query: Query, doc: MongoDocument, options?: UpdateOptions) => Promise<MongoDocument>
	removeAsync: (query: Query, options?: RemoveOptions) => Promise<number>
	find: (query: Query, projection: Projection, callback: Callback<MongoDocument[]>) => void
}
