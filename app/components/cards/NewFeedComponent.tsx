import React, { useContext } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { StateContext } from "../../context/Context"
import { Feed, Section } from "../../feed/feed"
import { Input } from "react-native-elements";
import AddRemoveSchemaSection from "../icons/AddSchemaSection";

export const newSchemaScreenInitialState: Feed = {
	source: '',
	description: '',
	category: '',
	sections: new Map<number, Section>().set(0, {
		section_selector: '',
		title_selector: '',
		title_must_contain: '',
		subtitle_selector: '',
		subtitle_must_contain: '',
		url_selector: '',
	})
}

const newEmptySection: Section = {
	section_selector: '',
	title_selector: '',
	title_must_contain: '',
	subtitle_selector: '',
	subtitle_must_contain: '',
	url_selector: '',
}
const newSchemaStyles = StyleSheet.create({
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
const sectionsStyles = StyleSheet.create({
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

const NewSchemaInput = (props: any) => {
	return (
		<Input
			value={props.value}
			label={props.label}
			placeholder={props.placeholder}
			labelStyle={newSchemaStyles.label}
			inputStyle={newSchemaStyles.input}
			inputContainerStyle={newSchemaStyles.inputContainer}
			containerStyle={newSchemaStyles.containerStyle}
			onChangeText={(value) => props.onChange(props.label, value)}
		/>
	)
}

const Sections = (props: { handleChanges: (index: number, section: Section) => {}}) => {
	const { state, actions } = useContext(StateContext)
	const sectionsArray = Array.from(state.newSchemaScreen.sections)
	
	const addSection = () => {
		props.handleChanges(sectionsArray.length, newEmptySection)
	}
	
	return (
		<View style={sectionsStyles.container}>
			{sectionsArray.map(v => RenderSection(v[0], v[1]))}
			
			<AddRemoveSchemaSection callback={addSection}/>
		</View>
	)
}

const RenderSection = (index: number, section: Section) => {
	console.log(index, section)
	return (
		<View style={sectionsStyles.section} key={index}>
			<NewSchemaInput value={section.section_selector} label="Section selector" placeholder='.row.management section'/>
			<NewSchemaInput value={section.title_selector} label="Title selector" placeholder='.text-wrapper h3'/>
			<NewSchemaInput value={section.title_must_contain} label="Title must contain (optional)" placeholder='covid'/>
			<NewSchemaInput value={section.subtitle_selector} label="Subtitle selector (optional)" placeholder='.text-wrapper p'/>
			<NewSchemaInput value={section.subtitle_must_contain} label="Subtitle must contain (optional)" placeholder=''/>
			<NewSchemaInput value={section.url_selector} label="URL selector" placeholder='a'/>
		</View>
	)
}

export default () => {
	const { state, actions } = useContext(StateContext)
	// const [schema, setSchema] = useState(newSchemaScreenInitialState)
	
	const handleChanges = (label: string, value: string | Object) => {
		actions.setNewSchemaScreen({...state.newSchemaScreen, [label.toLowerCase()]: value})
	}
	
	const handleSectionsChanges = (position: number, section: Section) => {
		const newSchema = new Map<number, Section>()
		Array.from(state.newSchemaScreen.sections).map((v, i) => newSchema.set(v[0], v[1]))
		
		newSchema.set(position, section)
		
		handleChanges('sections', newSchema)
	}
	
	return (
		<ScrollView style={newSchemaStyles.container}>
			<NewSchemaInput
				label="Source"
				placeholder='https://www.nytimes.com/'
				onChange={handleChanges}
				value={state.newSchemaScreen.source}/>
			<NewSchemaInput
				label="Description"
				placeholder='Times front page'
				onChange={handleChanges}
				value={state.newSchemaScreen.description}/>
			<NewSchemaInput
				label="Category"
				placeholder='economy'
				onChange={handleChanges}
				value={state.newSchemaScreen.category}/>
			
			<Text style={newSchemaStyles.sectionsTitle}>Sections</Text>
			
			<Sections handleChanges={handleSectionsChanges}/>
		</ScrollView>
	)
}
