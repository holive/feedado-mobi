import React, { useContext, useState } from "react"
import {
	FlatList,
	Linking,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import styles from '../../styles/theme.style'
import { StateContext } from "../../context/Context"

interface Data {
	id: string
	description: string
	category: string
	sourceName: string
}

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		description: "Located two hours south of Sydnes in the Southern Highlands of New South asdf asdf asdf asdf asdf asdfas dfaa Wales",
		category: "economia",
		sourceName: "economia.estadao.com.br",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		description: "Located two hours south of Sydnes in the Southern Highlands of New South   Wales, ...",
		category: "economia",
		sourceName: "economia.estadao.com.br",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		description: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		category: "economia",
		sourceName: "economia.estadao.com.br",
	},
	{
		id: "58294a0f-3da1-471f-bd96-145571e29d72",
		description: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		category: "economia",
		sourceName: "economia.estadao.com.br",
	},
	{
		id: "52694a0f-3da1-471f-bd96-145571e29d72",
		description: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		sourceName: "economia.estadao.com.br",
		category: "economia",
	},
	
]

const Item = (item: { item: Data }) => {
	return (
		<View style={schemaStyle.itemContainer}>
			<TouchableOpacity
				onPress={() => console.log("schemas...")}
				style={schemaStyle.item}
				activeOpacity={0.9}
			>
				<Text numberOfLines={1} style={schemaStyle.sourceName}>{item.item.sourceName}</Text>
				<Text numberOfLines={1} style={schemaStyle.description}>{item.item.description}</Text>
				<Text numberOfLines={1} style={schemaStyle.category}>{item.item.category}</Text>
			</TouchableOpacity>
		</View>
	)
}

const FeedsComponent = () => {
	const { state, actions } = useContext(StateContext)
	
	const renderItem = (item: { item: Data }) => {
		return (
			<Item
				item={item.item}
			/>
		)
	}
	
	return (
		<SafeAreaView style={schemaStyle.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	)
}

const schemaStyle = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 10,
	},
	itemContainer: {
		flexDirection: "row",
	},
	item: {
		padding: 15,
		paddingVertical: 12,
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 3,
		marginBottom: 8,
		elevation: 0.5,
	},
	description: {
		fontSize: 13,
		color: '#46494c',
		marginVertical: 5,
	},
	sourceName: {
		color: styles.ORANGE,
		fontSize: 13,
		marginTop: 4,
	},
	category: {
		fontSize: 14,
		color: '#46494c',
		textTransform: "uppercase",
	}
})

const loadInBrowser = (url: string) => {
	Linking.openURL(url).catch(err => console.error("Couldn't load page", err))
}

export default FeedsComponent
