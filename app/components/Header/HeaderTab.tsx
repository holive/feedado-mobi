import React, { useContext, useState } from 'react'
import { ButtonGroup } from 'react-native-elements'
import styles from '../../styles/theme.style'
import { StateContext } from "../../context/Context"
import { StyleSheet } from "react-native"
import { RSS, FEEDS } from "../../variables"
import * as RootNavigation from '../../routes/RootNavigation'

const NewSchemaTab = (props: any) => {
	return <ButtonGroup
		buttons={[props.text]}
		onPress={() => {}}
		innerBorderStyle={headerTabStyles.innerBorderStyle}
		textStyle={headerTabStyles.textStyle}
		containerStyle={headerTabStyles.containerStyle}
		buttonContainerStyle={headerTabStyles.buttonContainerStyle}
		buttonStyle={headerTabStyles.newSchemaButtonStyle}
		selectedButtonStyle={headerTabStyles.selectedButtonStyle}
	/>
}

const HeaderTab = () => {
	const { state, actions } = useContext(StateContext)
	const [selectedIndex, setSelectedIndex] = useState(0)
	
	if (state.screens.newSchema && state.newSchemaScreen.source) {
		return <NewSchemaTab text={state.newSchemaScreen.source.replace('http://', '').replace('https://', '')}/>
	} else if (state.screens.newSchema) {
		return <NewSchemaTab text='NEW SCHEMA'/>
	}
	
	const updateIndex = (selectedIndex: any) => {
		setSelectedIndex(selectedIndex)
		if (selectedIndex == 0) {
			RootNavigation.navigate(RSS, null)
			actions.setScreens({ feeds: true })
			return
		}
		RootNavigation.navigate(FEEDS, null)
		actions.setScreens({ schemas: true })
	}
	
	return <ButtonGroup
		onPress={updateIndex}
		selectedIndex={selectedIndex}
		buttons={["FEEDS", "SCHEMAS"]}
		innerBorderStyle={headerTabStyles.innerBorderStyle}
		textStyle={headerTabStyles.textStyle}
		selectedTextStyle={headerTabStyles.selectedTextStyle}
		containerStyle={headerTabStyles.containerStyle}
		buttonContainerStyle={headerTabStyles.buttonContainerStyle}
		buttonStyle={headerTabStyles.buttonStyle}
		selectedButtonStyle={headerTabStyles.selectedButtonStyle}
	/>
}

const headerTabStyles = StyleSheet.create({
	containerStyle: {
		height: 48,
		marginLeft: 0,
		marginRight: 0,
		marginBottom: 0,
		marginTop: -1,
		borderWidth: 0,
		borderRadius: 0
	},
	buttonContainerStyle: {
		backgroundColor: styles.HEADER_BACKGROUND_COLOR,
	},
	buttonStyle: {
		borderBottomWidth: 4,
		borderBottomColor: styles.HEADER_BACKGROUND_COLOR,
	},
	selectedButtonStyle: {
		backgroundColor: styles.HEADER_BACKGROUND_COLOR,
		borderBottomColor: styles.ORANGE,
	},
	innerBorderStyle: { width: 0 },
	textStyle: { color: "#979798", fontSize: 14 },
	selectedTextStyle: { color: "#fff" },
	newSchemaButtonStyle: {
		borderBottomWidth: 4,
		borderBottomColor: styles.ORANGE,
	},
})

export default HeaderTab
