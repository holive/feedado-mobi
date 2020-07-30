import React, { useContext } from 'react'

import Icon from "react-native-vector-icons/MaterialIcons"
import { StateContext } from "../../context/Context"
import * as RootNavigation from "../../routes/RootNavigation"
import { FEEDS, NEW_FEED } from "../../variables"
import { Alert } from "react-native";
import { Feed, Section } from "../../feed/feed";

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
			.then(() => {
				console.debug('...updating schema: ', state.newSchemaScreen)
				RootNavigation.navigate(FEEDS, null)
				actions.setScreens({ schemas: true })
			})
			.catch(e => console.warn(e.message))
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
			color="#FFF"
			onPress={() => console.log('refresh')}
		/>
	)
}

export const LeftIconsdHeader = () => {
	const { state, actions } = useContext(StateContext)
	
	if (state.screens.newSchema) {
		return (
			<Icon
				name="arrow-back"
				size={24}
				color="#FFF"
				onPress={() => {
					RootNavigation.navigate(FEEDS, null)
					actions.setScreens({ schemas: true })
				}}
			/>
		)
	}
	
	return (
		<Icon
			name="menu"
			size={24}
			color="#FFF"
			onPress={() => console.log('refresh')}
		/>
	)
}
