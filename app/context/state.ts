import Screens from "./Context"
import FeedService from "../feed/service"
import RssService from "../rss/service"
import { newMongoFeedRepo } from "../mongo/feed";
import { newMongoRssRepo } from "../mongo/rss";

export default interface State {
	screens: Screens
	categories: Array<{ [key: string]: string }>
	currentCategory: string
	feedService: FeedService
	rssService: RssService
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
		feedService: feedService,
		rssService: rssService,
		categories: [],
		currentCategory: '',
	}
}
