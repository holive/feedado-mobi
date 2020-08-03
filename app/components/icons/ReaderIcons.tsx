import React, { useContext } from 'react'

import Icon from "react-native-vector-icons/MaterialIcons"
import { StateContext } from "../../context/Context"
import * as RootNavigation from "../../routes/RootNavigation"
import { FEEDS, RSS, NEW_FEED, CONFIG } from "../../variables"
import { Alert, StyleSheet } from "react-native"
import { Section } from "../../feed/feed"
import { Rss } from "../../rss/rss";

const cheerio = require('react-native-cheerio')

Icon.loadFont()

export const RightIconHeader = () => {
	const { state, actions } = useContext(StateContext)
	
	const schemaIsValid = (schema: {source: string, category: string, sections: Array<Section>}): boolean => {
		let isValid = true
		
		if (!schema.source || !schema.category) isValid = false

		schema.sections.forEach((v, i) => {
			if (!v.section_selector || !v.url_selector) isValid = false
		})
		
		return isValid
	}
	
	const saveSchema = () => {
		if (!state.feedService.validateURL(state.newSchemaScreen.source)) {
			Alert.alert(
				'...oops',
				'Invalid source URL!',
				[
					{ text: 'OK' }
				],
				{ cancelable: true }
			)
			
			return
		}
		
		let save = state.feedService.create
		if (state.newSchemaScreen._id) save = state.feedService.update
		
		// @ts-ignore
		if (!schemaIsValid(state.newSchemaScreen)) {
			Alert.alert(
				'Unable to Save',
				'missing required field(s)',
				[
					{ text: 'OK' }
				],
				{ cancelable: true }
			)
			
			return
		}
		
		save(state.newSchemaScreen)
			.then((res) => {
				if (res) console.warn(res.message)
				console.debug('...updating schema: ', state.newSchemaScreen)
				
				RootNavigation.navigate(FEEDS, null)
				actions.setScreens({ schemas: true })
			})
			.catch(e => console.warn(e.message))
	}
	
	const generateRsssByCategory = (category: string) => {
		actions.setIsLoading(true)
		state.currentCategory
		state.feedService.findAllByCategory(category)
			.then(async (res) => {
				const Rsss: { [key: string]: Rss } = {}
				const feeds = res.searchResult.feeds || []
				
				for (const [i, feed] of feeds.entries()) {
					for (const [j, section] of feed.sections.entries()) {
						await fetch(feed.source)
							.then((resp) => resp.text())
							.then((res) => {
								const copySection = { ...section } // got null if not copy
								const $ = cheerio.load(res)
								const section_selector = $(copySection.section_selector)
								
								for (let l = 0; l < section_selector.length; l++) {
									const title = $(section.title_selector, section_selector[l]).text()
									const subtitle = $(section.subtitle_selector, section_selector[l]).text()
									const a = $(section.url_selector, section_selector[l]).attr('href')
									
									// validate
									if (!a || !title) continue
									if (section.title_must_contain
										&& !title.toLowerCase().includes(section.title_must_contain.toLowerCase())) continue
									if (section.subtitle_must_contain
										&& !subtitle.toLowerCase().includes(section.subtitle_must_contain.toLowerCase())) continue
									
									Rsss[a] = {
										url: a,
										category: feed.category,
										title: title,
										subtitle: subtitle,
										timestamp: Date.now(),
									}
								}
							})
						
					}
				}
				
				for (const [i, rss] of Object.keys(Rsss).entries()) {
					await state.rssService.create(Rsss[rss])
						.catch((e) => console.warn('could not create rss: ', e.message))
						.then(() => console.debug('rss created: ', rss))
				}
			})
			.then(() => {
				// reload feeds screen
				state.feedService.findAllCategories((cats: Array<{ [key: string]: string }>) => {
					actions.setIsLoading(false, { categories: cats })
				})
			})
	}
	
	const saveConfig = () => {
		state.configService.update(state.config)
			.then(() => {
				RootNavigation.navigate(RSS, null)
				actions.setScreens({ feeds: true })
			})
	}
	
	if (state.isLoading) return null
	
	if (state.screens.config) {
		return (
			<Icon
				name="save"
				size={24}
				style={iconsStyle.icon}
				onPress={() => saveConfig()}
			/>
		)
	}
	
	if (state.screens.newSchema) {
		return (
			<Icon
				name="save"
				size={24}
				color="#FFF"
				onPress={() => saveSchema()}
			/>
		)
	}
	
	if (state.screens.schemas) {
		return (
			<Icon
				name="add"
				size={24}
				color="#FFF"
				onPress={() => {
					RootNavigation.navigate(NEW_FEED, null)
					actions.setScreens({ newSchema: true })
				}}
			/>
		)
	}
	
	return (
		<Icon
			name="refresh"
			size={24}
			style={iconsStyle.icon}
			onPress={() => generateRsssByCategory(state.currentCategory)}
		/>
	)
}

export const LeftIconsdHeader = () => {
	const { state, actions } = useContext(StateContext)
	
	if (state.screens.config) {
		return (
			<Icon
				name="arrow-back"
				size={24}
				style={iconsStyle.icon}
				onPress={() => {
					RootNavigation.navigate(RSS, null)
					actions.setScreens({ feeds: true })
				}}
			/>
		)
	}
	
	if (state.screens.newSchema) {
		return (
			<Icon
				name="arrow-back"
				size={24}
				style={iconsStyle.icon}
				onPress={() => {
					RootNavigation.navigate(FEEDS, null)
					actions.setScreens({ schemas: true })
				}}
			/>
		)
	}
	
	return null
	// return (
	// 	<Icon
	// 		name="settings"
	// 		size={24}
	// 		style={iconsStyle.icon}
	// 		onPress={() => {
	// 			RootNavigation.navigate(CONFIG, null)
	// 			actions.setScreens({ config: true })
	// 		}}
	// 	/>
	// )
}

const iconsStyle = StyleSheet.create({
	icon: {
		color: '#FFF',
		marginHorizontal: 6,
	}
})
