import Screens from "./screensState"
import FeedService from "../feed/service"
import RssService from "../rss/service"

export default interface State {
	screens: Screens,
	feedService: FeedService
	rssService: RssService
}

export const initialState = {
	screens: {
		feeds: true,
		schemas: false,
		newSchema: false,
	}
} as State
