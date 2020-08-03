import Screens from "./Context"
import FeedService from "../feed/service"
import RssService from "../rss/service"
import { newMongoFeedRepo } from "../mongo/feed";
import { newMongoRssRepo } from "../mongo/rss";
import { Feed, Section } from "../feed/feed";
import { Config, NEW_INSTALLATION } from "../config/config";
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
	sections: new Map<number, Section>().set(0, { ...newEmptySection })
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
		newSchemaScreen: { ...newSchemaScreenInitialState },
		config: { max_feeds_by_category: '', new_installation: true }
	}
}

export const loadInitialData = async (configService: ConfigService, rssService: RssService, feedService: FeedService): Promise<void> => {
	console.debug('...creating demo data')
	
	const newFeed: Feed = {
		source: "https://economia.estadao.com.br",
		description: "Notícias de Economia e Negócios | Estadão",
		category: "demo",
		sections: new Map<number, Section>(),
	}
	newFeed.sections.set(0, {
		section_selector: ".row.management section",
		title_selector: ".text-wrapper h3",
		title_must_contain: "",
		subtitle_selector: ".text-wrapper p",
		subtitle_must_contain: "",
		url_selector: "a"
	})
	newFeed.sections.set(1, {
		section_selector: "#ultimas .lista section",
		title_selector: ".third",
		title_must_contain: "",
		subtitle_selector: "p",
		subtitle_must_contain: "",
		url_selector: ".link-title"
	})
	
	await feedService.create(newFeed).then((value) => {
		if (value) console.warn('feed demo:', value.message)
	}).catch((e) => console.warn('feed demo:: catch: ', e.message))
	
	await rssService.create({
			title: 'Congresso articula saídas alternativas para elevar gastos em investimentos sem esbarrar no teto',
			subtitle: 'As conversas têm como justificativa gerar empregos no pós-pandemia e são acompanhadas pelo ministro Rogério Marinho, um principais entusiastas do Plano Pró-Brasil de investimentos públicos',
			url: 'https://economia.estadao.com.br/noticias/geral,congresso-articula-saidas-alternativas-para-elevar-gastos-em-investimentos-sem-esbarrar-no-teto,70003383231',
			category: 'demo',
			timestamp: 1596405502080,
		})
		.then((res) => { if (res) console.warn('rss demo:', res.message) })
		.catch((e) => console.warn('rss demo: catch: ', e.message))
	
	return
}
