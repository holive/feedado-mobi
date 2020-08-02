import Screens from "./Context"
import FeedService from "../feed/service"
import RssService from "../rss/service"
import { newMongoFeedRepo } from "../mongo/feed";
import { newMongoRssRepo } from "../mongo/rss";
import { Feed, Section } from "../feed/feed";
import { Config } from "../config/config";
import ConfigService from "../config/service";
import { newMongoConfigRepo } from "../mongo/config";

export const newEmptySection: Section = {
	section_selector: '',
	title_selector: '',
	title_must_contain: '',
	subtitle_selector: '',
	subtitle_must_contain: '',
	url_selector: '',
}

export const newSchemaScreenInitialState: Feed = {
	source: '',
	description: '',
	category: '',
	sections: new Map<number, Section>().set(0, {...newEmptySection})
}

export default interface State {
	screens: Screens
	categories: Array<{ [key: string]: string }>
	currentCategory: string
	feedService: FeedService
	rssService: RssService
	configService: ConfigService
	newSchemaScreen: Feed
	isEditingSchema: boolean
	isLoading: boolean
	config: Config
}

export const getInitialState = (): State => {
	const feedService = new FeedService(newMongoFeedRepo())
	const rssService = new RssService(newMongoRssRepo())
	const configService = new ConfigService(newMongoConfigRepo())
	
	return {
		screens: {
			feeds: true,
			schemas: false,
			newSchema: false,
			config: false,
		},
		isEditingSchema: false,
		isLoading: false,
		feedService: feedService,
		rssService: rssService,
		configService: configService,
		categories: [],
		currentCategory: '',
		newSchemaScreen: {...newSchemaScreenInitialState},
		config: { max_feeds_by_category: '' }
	}
}
