import { StyleSheet } from "react-native"

export const newSchemaStyles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		height: 10020,
		paddingVertical: 25,
		paddingHorizontal: 10,
	},
	input: {
		color: '#46494c',
		fontSize: 14,
	},
	inputContainer: {
		backgroundColor: '#fff',
		borderRadius: 3,
		padding: 15,
		paddingVertical: 12,
		borderColor: '#eee',
		borderBottomWidth: 0.5,
		borderWidth: 0.5,
		height: 40,
	},
	containerStyle: {
		height: 40,
		marginBottom: 40,
	},
	label: {
		marginBottom: 5,
		fontSize: 14,
	},
	sectionsTitle: {
		fontSize: 14,
		fontWeight: "bold",
		color: '#c5c3c6',
		textAlign: "center",
	},
})

export const sectionsStyles = StyleSheet.create({
	container: {
		marginBottom: 30,
	},
	section: {
		borderTopWidth: 0.5,
		borderTopColor: '#c5c3c6',
		padding: 15,
		marginTop: 15,
	},
})
