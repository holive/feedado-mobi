import React from 'react'

import Icon from "react-native-vector-icons/MaterialIcons"
import { StyleSheet, TouchableOpacity } from "react-native"

Icon.loadFont()

export const AddSchemaSection = (props: { callback: Function }) => {
	return (
		<TouchableOpacity
			onPress={() => props.callback()}
			activeOpacity={0.8}
		>
			<Icon
				name="add"
				size={24}
				color="#FFF"
				style={iconStyle.icon}
			/>
		</TouchableOpacity>
	
	)
}

export const RemoveSchemaSection = (props: { callback: Function }) => {
	return (
		<TouchableOpacity
			onPress={() => props.callback()}
			activeOpacity={0.8}
		>
			<Icon
				name="delete"
				size={18}
				color="#FFF"
				style={iconStyle.delete}
			/>
		</TouchableOpacity>
	
	)
}

const iconStyle = StyleSheet.create({
	icon: {
		backgroundColor: '#c5c3c6',
		marginBottom: 30,
		textAlign: 'center',
		height: 30,
		width: 30,
		borderRadius: 100,
		textAlignVertical: 'center',
		alignSelf: 'center',
	},
	delete: {
		backgroundColor: '#c5c3c6',
		marginBottom: 0,
		textAlign: 'center',
		height: 25,
		width: 25,
		borderRadius: 100,
		textAlignVertical: 'center',
		alignSelf: 'flex-end',
	}
})
