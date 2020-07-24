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
import { Rss } from "../../rss/rss";

export const Dropdown = () => {
	const { state, actions } = useContext(StateContext)
	const [selectedCategory, setCategory] = useState('')
	
	useEffect(() => fetchCategoriesAndUpdateDropdown(), [])
	
	const fetchCategoriesAndUpdateDropdown = () => {
		state.feedService.findAllCategories((cats: Array<{ [key: string]: string }>) => {
			actions.setCategories(cats)
			if (cats[0]) setCategory(cats[0].value)
		})
	}
	
	const setCurrentCategory = (category: string) => {
		setCategory(category)
		actions.setCurrentCategory(category)
	}
	
	return (
		<RNPickerSelect
			onValueChange={(category) => setCurrentCategory(category)}
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

const Item = (item: { item: Rss }) => {
	const rss = item.item
	const subtitle = rss.subtitle ? <Text style={feedStyle.subtitle}>{rss.subtitle}</Text> : null
	
	return (
		<View style={feedStyle.itemContainer}>
			<TouchableOpacity
				onPress={() => loadInBrowser(rss.url)}
				style={feedStyle.item}
				activeOpacity={0.9}
			>
				<Text style={feedStyle.title}>{rss.title}</Text>
				{subtitle}
				<Text numberOfLines={1} style={feedStyle.sourceName}>{rss.source}</Text>
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

const RssComponent = () => {
	const { state, actions } = useContext(StateContext)
	const currentCategoryInitialState: Array<Rss> = []
	const [currentCategories, setCurrentCategories] = useState(currentCategoryInitialState)
	
	useEffect(() => {
		state.rssService.findAllByCategory(state.currentCategory)
			.then((res) => {
				const cats = res.searchResult.rsss ? res.searchResult.rsss : []
				setCurrentCategories(cats)
			})
	}, [state.currentCategory])
	
	const renderItem = (item: { item: Rss }) => {
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
				title: 'Notícia de economia',
				subtitle: 'Teste de subtítulo com mais de uma linha para testar o layout da lista de rss do app de feed personalizado',
				url: 'https://google.com/asdf',
				category: 'economia',
				timestamp: Date.now(),
			})
			.then((res) => console.debug('test create rss: then: ', res))
			.catch((e) => console.debug('test create rss: catch: ', e.message))
		
		// teste find rss by category
		await state.rssService.findAllByCategory('economia')
			.then((res) => console.debug('test find rss by category: then: ', res.searchResult))
			.catch((e) => console.debug('test find rss by category: catch: ', e.message))
		
		// teste find all categories
		// await state.feedService.findAllCategories(actions.setCategories)
	}
	
	return (
		<SafeAreaView style={feedStyle.container}>
			<Button onPress={() => teste()}>teste</Button>
			
			<Dropdown/>
			
			<FlatList
				data={currentCategories}
				renderItem={renderItem}
				keyExtractor={(item) => item._id || ''}
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
