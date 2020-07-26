export interface Section {
	section_selector: string
	title_selector: string
	title_must_contain: string
	subtitle_selector: string
	subtitle_must_contain: string
	url_selector: string
}

export interface Feed {
	_id?: string
	source: string
	description: string
	category: string
	sections: SectionsType
}

export type SectionsType = Map<number, Section>

export interface SearchResult {
	feeds: Array<Feed> | null
}
