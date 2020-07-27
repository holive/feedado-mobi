import React, { useContext, useEffect, useState } from "react"
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal
} from "react-native"
import styles from '../../styles/theme.style'
import { StateContext } from "../../context/Context"
import { Feed } from "../../feed/feed";
import * as RootNavigation from "../../routes/RootNavigation";
import { NEW_FEED } from "../../variables";

const Item = (props: { item: Feed, currentFeedList: Array<Feed>, setCurrentFeedList: Function }) => {
	const { state, actions } = useContext(StateContext)
	const [modalVisible, setModalVisible] = useState(false)
	
	const editSchema = () => {
		RootNavigation.navigate(NEW_FEED, { source: props.item.source })
		actions.setIsEditingSchema(true)
	}
	
	const f = props.item
	
	return (
		<View style={schemaStyle.itemContainer}>
			<TouchableOpacity
				onPress={() => editSchema()}
				style={schemaStyle.item}
				activeOpacity={0.9}
			>
				<Text numberOfLines={1} style={schemaStyle.sourceName}>{f.source}</Text>
				<Text numberOfLines={1} style={schemaStyle.description}>{f.description}</Text>
				<Text numberOfLines={1} style={schemaStyle.category}>{f.category}</Text>
			</TouchableOpacity>
		</View>
	)
}

const FeedsComponent = () => {
	const { state, actions } = useContext(StateContext)
	const feedListInitialState: Array<Feed> = []
	const [currentFeedList, setCurrentFeedList] = useState(feedListInitialState)
	
	useEffect(() => {
		state.feedService.findAll()
			.then((res) => {
				const feeds = res.searchResult.feeds ? res.searchResult.feeds : []
				setCurrentFeedList(feeds)
			})
	}, [state.screens.schemas])
	
	const renderItem = (props: { item: Feed }) => {
		return (
			<Item
				item={props.item}
				currentFeedList={currentFeedList}
				setCurrentFeedList={setCurrentFeedList}
			/>
		)
	}
	
	return (
		<SafeAreaView style={schemaStyle.container}>
			<FlatList
				data={currentFeedList}
				renderItem={renderItem}
				keyExtractor={(item) => item._id || ''}
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
		flex: 1,
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

export default FeedsComponent
