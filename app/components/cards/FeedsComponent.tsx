import React, { useContext, useEffect, useState } from "react"
import {
	FlatList,
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native"
import styles from '../../styles/theme.style'
import { StateContext } from "../../context/Context"
import { Feed } from "../../feed/feed";
import * as RootNavigation from "../../routes/RootNavigation";
import { NEW_FEED } from "../../variables";

const Item = (props: { item: Feed, currentFeedList: Array<Feed>, setCurrentFeedList: Function, loadFeeds: Function }) => {
	const { state, actions } = useContext(StateContext)
	const [modalVisible, setModalVisible] = useState(false)
	
	const editSchema = () => {
		RootNavigation.navigate(NEW_FEED, { source: props.item.source })
		actions.setIsEditingSchema(true)
	}
	
	const deleteSchema = (id: string) => {
		state.feedService.delete(id)
			.then(() => {
				props.loadFeeds()
				setModalVisible(!modalVisible)
			})
			.catch((e) => console.log(e.message))
	}
	
	const f = props.item
	
	return (
		<View style={schemaStyle.itemContainer}>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(!modalVisible)}
			>
				<View style={confirmationModalStyles.centeredView} onTouchEnd={() => setModalVisible(!modalVisible)}>
					<View style={confirmationModalStyles.modalView}>
						<View
							style={confirmationModalStyles.openButton}
						>
							<Text
								onPress={() => deleteSchema(f._id || '')}
								style={confirmationModalStyles.textStyle}
							>
								DELETE "{f.source}"
							</Text>
						</View>
					</View>
				</View>
			</Modal>
			
			<TouchableOpacity
				onPress={() => editSchema()}
				onLongPress={() => setModalVisible(true)}
				style={schemaStyle.item}
				activeOpacity={0.85}
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
		loadFeeds()
	}, [state.screens.schemas])
	
	const loadFeeds = () => {
		state.feedService.findAll()
			.then((res) => {
				const feeds = res.searchResult.feeds ? res.searchResult.feeds : []
				setCurrentFeedList(feeds)
			})
	}
	
	const renderItem = (props: { item: Feed }) => {
		return (
			<Item
				loadFeeds={loadFeeds}
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

const confirmationModalStyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		backgroundColor: 'rgba(0,0,0, 0.5)',
	},
	modalView: {
		width: '80%',
		backgroundColor: "white",
		borderRadius: 1,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.15,
		shadowRadius: 5,
		elevation: 25
	},
	openButton: {
		padding: 10,
	},
	textStyle: {
		color: "#46494c",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});

export default FeedsComponent
