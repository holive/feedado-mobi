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
		if (!category) return
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

const animationDuration = 500

const AnimatableFade = ({isVisible, children}: { isVisible: boolean, children: React.ReactNode }) => {
	if (isVisible) return <View>{children}</View>
	
	return (
		<Animatable.View
			duration={animationDuration}
			animation='fadeOutRightBig'
			style={[
				{opacity: isVisible ? 1.0 : 0.0},
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
					<Text numberOfLines={1} style={feedStyle.sourceName}>{rss.source}</Text>
				
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
	
	useEffect(() => {
		state.rssService.findAllByCategory(state.currentCategory)
			.then((res) => {
				const rsss = res.searchResult.rsss ? res.searchResult.rsss : []
				setCurrentRssList(rsss)
			})
	}, [state.currentCategory, state.screens.feeds])
	
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
		// await state.feedService.create({
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
		// }).then((value) => {
		// 	console.log('test: then: ', value)
		//  }).catch((e) => console.log('teste: catch: ', e.message))
		
		// // test remove
		// await state.feedService.delete('https://google.com.br')
		// 	.then((res) => console.log('test delete: then: ', res))
		// 	.catch((e) => console.log('test delete: catch: ', e.message))
		
		// test find all feeds
		await state.feedService.findAll()
			.then((res) => {
				console.log('test findall: then: ')
				res.searchResult.feeds?.forEach((v) => {
					console.log(v)
				})
			})
			.catch((e) => console.log('test findall: catch: ', e.message))
		//
		// test update
		await state.feedService.update({
			source: 'https://google.com.br',
			description: 'string',
			category: 'politica',
			// @ts-ignore
			sections: [{
				section_selector: 'df',
				title_selector: '234',
				title_must_contain: '3re34r3',
				subtitle_selector: '',
				subtitle_must_contain: '',
				url_selector: 'a',
			}]
		}).then((res) => console.log('test update: then: ', res))
			.catch((e) => console.log('test update: catch: ', e.message))
		
		// teste create rss
		// await state.rssService.create({
		// 		source: 'https://google.com',
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
	}
	
	return (
		<SafeAreaView style={feedStyle.container}>
			<Button onPress={() => teste()}>teste</Button>
			
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
		alignSelf: 'center',
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
