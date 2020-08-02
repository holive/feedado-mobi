import Screens from "./Context"
import FeedService from "../feed/service"
import RssService from "../rss/service"
import { newMongoFeedRepo } from "../mongo/feed";
import { newMongoRssRepo } from "../mongo/rss";
import { Feed, Section } from "../feed/feed";

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
	newSchemaScreen: Feed
	isEditingSchema: boolean
	isLoading: boolean
}

export const getInitialState = (): State => {
	const feedService = new FeedService(newMongoFeedRepo())
	const rssService = new RssService(newMongoRssRepo())
	
	return {
		screens: {
			feeds: true,
			schemas: false,
			newSchema: false,
		},
		isEditingSchema: false,
		isLoading: false,
		feedService: feedService,
		rssService: rssService,
		categories: [],
		currentCategory: '',
		newSchemaScreen: {...newSchemaScreenInitialState},
	}
}
