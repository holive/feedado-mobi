import React, { useContext, useEffect, useState } from "react"
import {
	FlatList,
	Linking,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from '../../styles/theme.style'
import RNPickerSelect from 'react-native-picker-select'
import { StateContext } from "../../context/Context"
import { Button } from "react-native-elements"
import { Rss } from "../../rss/rss"
import Loading from "../Loading";
import { loadInitialData } from "../../context/state";
import { NEW_INSTALLATION } from "../../config/config";

// const cheerio = require('react-native-cheerio')

export const Dropdown = () => {
	const { state, actions } = useContext(StateContext)
	const [selectedCategory, setCategory] = useState('')
	
	useEffect(() => fetchCategoriesAndUpdateDropdown(), [state.screens.newSchema])
	
	const fetchCategoriesAndUpdateDropdown = () => {
		state.feedService.findAllCategories((cats: Array<{ [key: string]: string }>) => {
			actions.setCategories(cats)
			if (cats[0]) setCategory(state.currentCategory || cats[0].value)
		})
	}
	
	const setCurrentCategory = (category: string) => {
		if (!category) return
		setCategory(category)
		actions.setCurrentCategory(category)
	}
	
	if (state.isLoading) return null
	
	return (
		<View style={{paddingLeft: 16, paddingRight: 0, marginTop: 20, marginBottom: 20, width: '100%', }}>
			<RNPickerSelect
				pickerProps={{ mode: 'dropdown'}}
				onValueChange={(category) => setCurrentCategory(category)}
				// @ts-ignore
				items={state.categories}
				value={selectedCategory}
				style={{
					inputAndroid: {
						fontSize: 14,
						paddingHorizontal: 14,
						paddingVertical: 5,
						borderRadius: 3,
						color: '#5c6b76',
						backgroundColor: '#fff',
						marginRight: 16,
					},
					iconContainer: {
						top: 14,
						right: 25,
					},
				}}
				Icon={() => <Icon name="keyboard-arrow-down" style={feedStyle.icon}/>}
				useNativeAndroidPickerStyle={false}
			/>
		</View>
	)
}

const animationDuration = 500

const AnimatableFade = ({ isVisible, children }: { isVisible: boolean, children: React.ReactNode }) => {
	if (isVisible) return <View>{children}</View>
	
	return (
		<Animatable.View
			duration={animationDuration}
			animation='fadeOutRightBig'
			style={[
				{ opacity: isVisible ? 1.0 : 0.0 },
			]}
			useNativeDriver={true}
		>
			{children}
		</Animatable.View>
	);
}

const Item = (props: { item: Rss, currentRssList: Array<Rss>, setCurrentRssList: Function }) => {
	const { state, actions } = useContext(StateContext)
	const [isVisible, setVisibility] = useState(true)
	
	const removeRss = (id: string) => {
		setVisibility(false)
		
		setTimeout(() => {
			state.rssService.delete(id).then(() => {
				const updatedList = props.currentRssList.filter((v, i) => v._id !== id)
				props.setCurrentRssList(updatedList)
			})
		}, animationDuration * 0.5)
	}
	
	const rss = props.item
	const subtitle = rss.subtitle ? <Text style={feedStyle.subtitle}>{rss.subtitle}</Text> : null
	
	return (
		<AnimatableFade isVisible={isVisible}>
			<View style={feedStyle.itemContainer}>
				<TouchableOpacity
					onPress={() => loadInBrowser(rss.url)}
					style={feedStyle.item}
					activeOpacity={0.9}
				>
					
					<Text style={feedStyle.title}>{rss.title}</Text>
					{subtitle}
					<Text numberOfLines={1} style={feedStyle.sourceName}>{rss.url}</Text>
				
				</TouchableOpacity>
				
				
				<Icon
					name="remove-circle"
					style={feedStyle.icon}
					onPress={() => removeRss(rss._id || '')}
				/>
			
			</View>
		</AnimatableFade>
	)
}

const RssComponent = () => {
	const { state, actions } = useContext(StateContext)
	const rssListInitialState: Array<Rss> = []
	const [currentRssList, setCurrentRssList] = useState(rssListInitialState)
	
	// load demo content: refactor, please
	useEffect(() => {
		state.configService.get().then(async (res) => {
			console.debug('test load rss', res)
			if (res) return

			await state.configService.update({ new_installation: false, max_feeds_by_category: '' })
			console.debug('get doc:', await state.configService.get())

			loadInitialData(state.configService, state.rssService, state.feedService)
				.then(() => {
					actions.setConfig({ max_feeds_by_category: '', new_installation: false }, true)
				})
		})
	}, [state.config.new_installation])

	useEffect(() => {
		state.rssService.findAllByCategory(state.currentCategory)
			.then((res) => {
				const rsss = res.searchResult.rsss ? res.searchResult.rsss : []
				setCurrentRssList(rsss)
			})
	}, [state.currentCategory, state.screens.feeds, state.categories])
	
	const renderItem = (props: { item: Rss }) => {
		return (
			<Item
				item={props.item}
				currentRssList={currentRssList}
				setCurrentRssList={setCurrentRssList}
			/>
		)
	}
	
	const teste = async () => {
		// test create feed
		// const newFeed: Feed = {
		// 	source: "https://economia.estadao.com.br",
		// 	description: "Notícias de Economia e Negócios | Estadão",
		// 	category: "teste",
		// 	sections: new Map<number, Section>(),
		// }
		// newFeed.sections.set(0, {
		// 	section_selector: ".row.management section",
		// 	title_selector: ".text-wrapper h3",
		// 	title_must_contain: "",
		// 	subtitle_selector: ".text-wrapper p",
		// 	subtitle_must_contain: "",
		// 	url_selector: "a"
		// })
		// newFeed.sections.set(1, {
		// 	section_selector: "#ultimas .lista section",
		// 	title_selector: ".third",
		// 	title_must_contain: "",
		// 	subtitle_selector: "p",
		// 	subtitle_must_contain: "",
		// 	url_selector: ".link-title"
		// })
		// await state.feedService.create(newFeed).then((value) => {
		// 	console.debug('test create feed')
		// 	if (value) console.warn('feed demo:', value.message)
		// }).catch((e) => console.warn('feed demo:: catch: ', e.message))
		
		// // test remove
		// await state.feedService.delete('kjh23g45jk2h34jkb2kj345b')
		// 	.then((res) => console.log('test delete: then: ', res))
		// 	.catch((e) => console.log('test delete: catch: ', e.message))
		
		// test find all feeds
		// await state.feedService.findAll()
		// 	.then((res) => {
		// 		console.log('test findall: then: ')
		// 		res.searchResult.feeds?.forEach((v) => {
		// 			console.log(v.sections)
		// 		})
		// 	})
		// 	.catch((e) => console.log('test findall: catch: ', e.message))

		// test update
		// await state.feedService.update({
		// 	source: 'https://google.com.br',
		// 	description: 'string',
		// 	category: 'politica',
		// 	// @ts-ignore
		// 	sections: [{
		// 		section_selector: 'df',
		// 		title_selector: '234',
		// 		title_must_contain: '3re34r3',
		// 		subtitle_selector: '',
		// 		subtitle_must_contain: '',
		// 		url_selector: 'a',
		// 	}]
		// }).then((res) => console.log('test update: then: ', res))
		// 	.catch((e) => console.log('test update: catch: ', e.message))
		
		// teste create rss
		// await state.rssService.create({
		// 		title: 'Notícia de economia',
		// 		subtitle: 'Teste de subtítulo com mais de uma linha para testar o layout da lista de rss do app de feed personalizado',
		// 		url: 'https://google.com/a',
		// 		category: 'economia',
		// 		timestamp: Date.now(),
		// 	})
		// 	.then((res) => console.debug('test create rss: then: ', res))
		// 	.catch((e) => console.debug('test create rss: catch: ', e.message))
		
		// teste find rss by category
		// await state.rssService.findAllByCategory('economia')
		// 	.then((res) => console.debug('test find rss by category: then: ', res.searchResult))
		// 	.catch((e) => console.debug('test find rss by category: catch: ', e.message))
		
		// teste find all categories
		// await state.feedService.findAllCategories(actions.setCategories)
		
		// teste find all sources by category
		// state.feedService.findAllByCategory('economia')
		// 	.then(async (res) => {
		// 		const Rsss: { [key: string]: Rss } = {}
		// 		const feeds = res.searchResult.feeds || []
		//
		// 		for (const [i, feed] of feeds.entries()) {
		// 			for (const [j, section] of feed.sections.entries()) {
		// 				await fetch(feed.source)
		// 					.then((resp) => resp.text())
		// 					.then((res) => {
		// 						const copySection = { ...section } // got null if not copy
		// 						const $ = cheerio.load(res)
		// 						const section_selector = $(copySection.section_selector)
		//
		// 						for (let l = 0; l < section_selector.length; l++) {
		// 							const title = $(section.title_selector, section_selector[l]).text()
		// 							const subtitle = $(section.subtitle_selector, section_selector[l]).text()
		// 							const a = $(section.url_selector, section_selector[l]).attr('href')
		//
		// 							// validate
		// 							if (!a || !title) continue
		// 							if (section.title_must_contain
		// 								&& !title.toLowerCase().includes(section.title_must_contain.toLowerCase())) continue
		// 							if (section.subtitle_must_contain
		// 								&& !subtitle.toLowerCase().includes(section.subtitle_must_contain.toLowerCase())) continue
		//
		// 							Rsss[a] = {
		// 								url: a,
		// 								category: feed.category,
		// 								title: title,
		// 								subtitle: subtitle,
		// 								timestamp: Date.now(),
		// 							}
		// 						}
		// 					})
		//
		// 			}
		// 		}
		//
		// 		for (const [i, rss] of Object.keys(Rsss).entries()) {
		// 			await state.rssService.create(Rsss[rss])
		// 				.catch((e) => console.warn('could not create rss: ', e.message))
		// 				.then(() => console.debug('rss created: ', rss))
		// 		}
		// 	})
		
		// teste config
		state.configService.get()
			.then((res) => {
				console.debug('test config get: ', res)
			})

		// await state.configService.update({max_feeds_by_category: '10'})
		// 	.then(() => {
		// 		state.configService.get()
		// 			.then((res) => {
		// 				console.debug('test config get: ', res)
		// 			})
		// 	})
	}
	
	if (state.isLoading) return <Loading />
	
	return (
		<SafeAreaView style={feedStyle.container}>
			{/*<Button onPress={() => teste()}>teste</Button>*/}
			
			<Dropdown/>
			
			<FlatList
				data={currentRssList}
				renderItem={renderItem}
				keyExtractor={(item) => item._id || ''}
			/>
		</SafeAreaView>
	)
}

const feedStyle = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 10,
	},
	itemContainer: {
		flexDirection: "row",
	},
	item: {
		padding: 15,
		paddingVertical: 12,
		marginVertical: 0,
		marginHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 3,
		width: "80%",
		marginBottom: 16,
		
		elevation: 0.5,
	},
	icon: {
		color: "#ddd",
		fontSize: 20,
		alignSelf: 'center',
		top: -4,
	},
	title: {
		fontSize: 13,
		color: '#46494c',
	},
	subtitle: {
		fontSize: 13,
		color: '#46494c',
		opacity: 0.6,
		marginVertical: 3,
	},
	sourceName: {
		color: styles.ORANGE,
		fontSize: 13,
		marginTop: 4,
	}
})

const loadInBrowser = (url: string) => {
	Linking.openURL(url).catch(err => console.error("Couldn't load page", err))
}

export default RssComponent
