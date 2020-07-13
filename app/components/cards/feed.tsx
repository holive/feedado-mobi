import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Data {
	id: string
	title: string
}

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "Located two hours south of Sydnes in the Southern Highlands of New South   Wales, ...",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Located two hours south of Sydnes in the Southern Highlands of New South   Wales, ...",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Located two hours south of Sydnes in the Southern Highlands of New South   Wales, ...",
	},
];

const Item = (item: { item: Data }) => {
	
	return (
		<TouchableOpacity style={styles.item} activeOpacity={0.85}>
			<Text style={styles.title}>{item.item.title}</Text>
		</TouchableOpacity>
	)
};

const App = () => {
	// const [selectedId, setSelectedId] = useState(null);
	
	const renderItem = (item: { item: Data }) => {
		return (
			<Item
				item={item.item}
				// onPress={() => setSelectedId(item.id)}
			/>
		);
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				// extraData={selectedId}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 3,
		
		shadowColor: '#ccc',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 0.8,
	},
	title: {
		fontSize: 13,
		color: '#46494c',
	},
});

export default App;
