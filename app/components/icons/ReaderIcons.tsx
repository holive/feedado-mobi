import React, { useContext } from 'react'

import Icon from "react-native-vector-icons/MaterialIcons"
import { StateContext } from "../../context/Context"
import * as RootNavigation from "../../routes/RootNavigation"
import { RSS, NEW_FEED, FEEDS } from "../../variables"

Icon.loadFont()

export const RightIconHeader = () => {
	const { state, actions } = useContext(StateContext)
	
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
