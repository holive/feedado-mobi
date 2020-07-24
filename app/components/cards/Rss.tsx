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
import Icon from "react-native-vector-icons/MaterialIcons"
import styles from '../../styles/theme.style'
import RNPickerSelect from 'react-native-picker-select'
import { StateContext } from "../../context/Context"
import { Button } from "react-native-elements";

interface Data {
	id: string
	title: string
	sourceName: string
	url: string
}

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "Located two hours south of Sydnes in the Southern Highlands of New South asdf asdf asdf asdf asdf asdfas dfaa Wales",
		sourceName: "economia.estadao.com.br",
		url: "https://google.com"
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Located two hours south of Sydnes in the Southern Highlands of New South   Wales, ...",
		sourceName: "economia.estadao.com.br",
		url: "https://google.com"
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		sourceName: "economia.estadao.com.br",
		url: "https://google.com"
	},
	{
		id: "58294a0f-3da1-471f-bd96-145571e29d72",
		title: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		sourceName: "economia.estadao.com.br",
		url: "https://google.com"
	},
	{
		id: "52694a0f-3da1-471f-bd96-145571e29d72",
		title: "Located two hours south of Sydnes in the South Highlands of a new experience...",
		sourceName: "economia.estadao.com.br",
		url: "https://google.com"
	},
	
]

export const Dropdown = () => {
	const { state, actions } = useContext(StateContext)
	const [selectedCategory, setCategory] = useState('')
	
	useEffect(() => {
		state.feedService.findAllCategories((cats: Array<{[key: string]: string}>) => {
			actions.setCategories(cats)
			if (cats[0]) { setCategory(cats[0].value) }
		})
	},	[])
	
	return (
		<RNPickerSelect
			onValueChange={(value) => setCategory(value)}
			 // @ts-ignore
			items={state.categories}
			value={selectedCategory}
			style={{
				inputAndroid: {
					fontSize: 14,
					paddingHorizontal: 14,
					paddingVertical: 5,
					marginTop: 20,
					marginBottom: 10,
					marginLeft: 16,
					marginRight: 16,
					borderRadius: 3,
					color: '#5c6b76',
					backgroundColor: '#fff',
				},
				iconContainer: {
					top: 30,
					right: 25,
				},
			}}
			Icon={() => <Icon name="keyboard-arrow-down" style={feedStyle.icon} /> }
			useNativeAndroidPickerStyle={false}
		/>
	)
}

const Item = (item: { item: Data }) => {
	return (
		<View style={feedStyle.itemContainer}>
			<TouchableOpacity
				onPress={() => loadInBrowser(item.item.url)}
				style={feedStyle.item}
				activeOpacity={0.9}
			>
				<Text numberOfLines={2} style={feedStyle.title}>{item.item.title}</Text>
				<Text numberOfLines={1} style={feedStyle.sourceName}>{item.item.sourceName}</Text>
			</TouchableOpacity>
			
			<TouchableOpacity style={{ alignSelf: "center", }} activeOpacity={0.6}>
				<Icon
					name="remove-circle"
					style={feedStyle.icon}
					// onPress={() => console.log('refresh')}
				/>
			</TouchableOpacity>
		</View>
	)
}

const Rss = () => {
	const { state, actions } = useContext(StateContext)
	
	const renderItem = (item: { item: Data }) => {
		return (
			<Item
				item={item.item}
			/>
		)
	}
	
	const teste = async () => {
		//  await state.feedService.create({
		// 	source: 'https://google.com.br',
		// 	description: 'string',
		// 	category: 'politica',
		// 	sections: [
		// 		{
		// 			section_selector: 'string',
		// 			title_selector: 'string',
		// 			title_must_contain: 'string',
		// 			subtitle_selector: 'string',
		// 			subtitle_must_contain: 'string',
		// 			url_selector: 'string'
		// 		}
		// 	]
		// }).then((value) => {
		// 	console.log('test: then: ', value)
		//  }).catch((e) => console.log('teste: catch: ', e.message))
		
		// // test remove
		// await state.feedService.delete('https://google.com')
		// 	.then((res) => console.log('test delete: then: ', res))
		// 	.catch((e) => console.log('test delete: catch: ', e.message))
		
		// test find all
		// await state.feedService.findAll()
		// 	.then((res) => {
		// 		console.log('test findall: then: ')
		// 		res.searchResult.feeds?.forEach((v) => {
		// 			console.log(v)
		// 		})
		// 	})
		// 	.catch((e) => console.log('test findall: catch: ', e.message))
		
		// test update
		// await state.feedService.update({
		// 	source: 'https://google.com',
		// 	description: 'updated',
		// 	category: 'economia',
		// 	sections: [
		// 		{
		// 			section_selector: 'string',
		// 			title_selector: 'string',
		// 			title_must_contain: 'string',
		// 			subtitle_selector: 'string',
		// 			subtitle_must_contain: 'string',
		// 			url_selector: 'string'
		// 		}
		// 	]
		// }).then((res) => console.log('test update: then: ', res))
		// 	.catch((e) => console.log('test update: catch: ', e.message))
		
		// teste create rss
		await state.rssService.create({
				source: 'https://google.com',
				title: 'string',
				url: 'https://google.com/asdf',
				category: 'economia',
				timestamp: Date.now(),
			})
			.then((res) => console.log('test create rss: then: ', res))
			.catch((e) => console.log('test create rss: catch: ', e.message))
		
		// teste find rss by category
		await state.rssService.findAllByCategory('economia')
			.then((res) => console.log('test find rss by category: then: ', res.searchResult))
			.catch((e) => console.log('test find rss by category: catch: ', e.message))
		
		// teste find all categories
		// await state.feedService.findAllCategories(actions.setCategories)
	}
	
	return (
		<SafeAreaView style={feedStyle.container}>
			<Button onPress={() => teste()}>teste</Button>
			
			<Dropdown/>
			
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				// extraData={selectedId}
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
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 3,
		width: "80%",
		marginBottom: 8,
		
		elevation: 0.5,
	},
	icon: {
		color: "#ddd",
		fontSize: 20,
	},
	title: {
		fontSize: 13,
		color: '#46494c',
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

export default Rss
