import React, { useContext, useState } from "react"
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

const Sections = (props: { schema: Feed, setSchema: Function }) => {
	const addSection = () => {
		const newSchema = {...props.schema}
		newSchema.sections.set(newSchema.sections.size, newEmptySection)
		props.setSchema(newSchema)
	}
	
	return (
		<View style={sectionsStyles.container}>
			{Array.from(props.schema.sections).map(RenderSection)}
			
			<AddRemoveSchemaSection callback={addSection}/>
		</View>
	)
}

const RenderSection = (section: Section, index: number) => {
	console.log('render section: ', section, index)
	
	return (
		<View style={sectionsStyles.section} key={index}>
			<Text>asdf</Text>
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
	const [schema, setSchema] = useState(newSchemaScreenInitialState)
	
	const handleChanges = (label: string, text: string | Object) => {
		actions.setNewSchemaScreen({...state.newSchemaScreen, [label.toLowerCase()]: text})
	}
	
	const handleSectionsChanges = (section: Section) => {
		// hadle
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
			
			<Sections schema={schema} setSchema={setSchema}/>
		</ScrollView>
	)
}
