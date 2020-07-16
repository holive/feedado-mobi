import React, { useState } from "react";
import {
	FlatList,
	Linking,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from '../../styles/theme.style';
import RNPickerSelect from 'react-native-picker-select';

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
];

const categories = [
	{ label: 'ECONOMIA', value: 'economia' },
	{ label: 'TECNOLOGIA', value: 'tecnologia' },
];

export const Dropdown = () => {
	const [selectedCategory, setCategory] = useState(categories[0].value);
	
	return (
		<RNPickerSelect
			onValueChange={(value) => setCategory(value)}
			items={categories}
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
	);
};

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
};

const App = () => {
	const renderItem = (item: { item: Data }) => {
		return (
			<Item
				item={item.item}
			/>
		);
	};
	
	return (
		<SafeAreaView style={feedStyle.container}>
			<Dropdown/>
			
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				// extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

const feedStyle = StyleSheet.create({
	container: {
		flex: 1,
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
});

const loadInBrowser = (url: string) => {
	Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
};

export default App;
