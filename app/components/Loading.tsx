// @ts-ignore
import { EatBeanLoader, TextLoader } from "react-native-indicator"
import { StyleSheet, View } from "react-native"
import React, { useContext } from "react"
import { StateContext } from "../context/Context"
import styles from '../styles/theme.style'

export default () => {
	const { state, actions } = useContext(StateContext)
	
	return (
		<View style={loadingStyle.container}>
			<EatBeanLoader color={styles.ORANGE}/>
			<TextLoader text={`Loading ${state.currentCategory} feeds`} textStyle={loadingStyle.text}/>
		</View>
	)
}

const loadingStyle = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		textAlign: "center",
		justifyContent: "center",
	},
	text: {
		color: '#46494c',
		marginTop: 10,
	}
})
