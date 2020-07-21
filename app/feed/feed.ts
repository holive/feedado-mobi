export interface Section {
	section_selector: string
	title_selector: string
	title_must_contain: string
	subtitle_selector: string
	subtitle_must_contain: string
	url_selector: string
}

export interface Feed {
	source: string
	description: string
	category: string
	sections: Array<Section>
}

export interface SearchResult {
	feeds: Array<Feed>
}
