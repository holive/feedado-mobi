import React, { useContext, useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import { StateContext } from "../../context/Context"
import { Section } from "../../feed/feed"
import { Input } from "react-native-elements";
import { AddSchemaSection, RemoveSchemaSection } from "../icons/IconsSchemaSection";
import { newEmptySection } from "../../context/state";
import styles from '../../styles/theme.style'
import * as RootNavigation from "../../routes/RootNavigation";
import { FEEDS } from "../../variables";

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

export const NewSchemaInput = (props: any) => {
	const [validValue, setValidValue] = useState(false)
	
	useEffect(() => { setValidValue(props.required && !props.value)	}, [props.value])
	
	const onChange = (value: string) => props.onChange(props.name, value)
	
	return (
		<Input
			keyboardType={props.keyboardType}
			value={props.value}
			label={props.label}
			placeholder={props.placeholder}
			labelStyle={newSchemaStyles.label}
			inputStyle={newSchemaStyles.input}
			inputContainerStyle={{...newSchemaStyles.inputContainer, borderColor: (validValue ? styles.ORANGE : newSchemaStyles.inputContainer.borderColor)}}
			containerStyle={newSchemaStyles.containerStyle}
			onChangeText={(value) => onChange(value)}
		/>
	)
}

const Sections = (props: { handleChanges: (index: number, section: Section) => void, removeSection: (index: number) => void }) => {
	const { state, actions } = useContext(StateContext)
	const sectionsArray = Array.from(state.newSchemaScreen.sections)
	
	const addEmptySection = () => {
		props.handleChanges(sectionsArray.length, {...newEmptySection})
	}
	
	const handleSectionChange = (index: number, fieldName: string, value: string) => {
		actions.handleNewScreenSectionFields(index, fieldName, value)
	}
	
	const deleteSection = (index: number) => {
		props.removeSection(index)
	}
	
	return (
		<View style={sectionsStyles.container}>
			{sectionsArray.map(v => RenderSection(v[0], v[1], handleSectionChange, deleteSection))}
			
			<AddSchemaSection callback={addEmptySection}/>
		</View>
	)
}

const RenderSection = (index: number, section: Section, handleChange: (index: number, fieldName: string, value: string) => void, deleteSection: (index: number) => void) => {
	const onChange = (name: string, value: string) => handleChange(index, name, value)
	
	const remove = () => deleteSection(index)
	
	if (!section) return null
	
	return (
		<View style={sectionsStyles.section} key={index}>
			<RemoveSchemaSection callback={remove} />
			<NewSchemaInput required={true} onChange={onChange} name="section_selector" value={section.section_selector} label="Section selector" placeholder='.row.management section'/>
			<NewSchemaInput onChange={onChange} name="title_selector" value={section.title_selector} label="Title selector" placeholder='.text-wrapper h3'/>
			<NewSchemaInput required={true} onChange={onChange} name="url_selector" value={section.url_selector} label="URL selector" placeholder='a'/>
			<NewSchemaInput onChange={onChange} name="subtitle_selector" value={section.subtitle_selector} label="Subtitle selector" placeholder='.text-wrapper p'/>
			<NewSchemaInput onChange={onChange} name="title_must_contain" value={section.title_must_contain} label="Title must contain" placeholder='covid'/>
			<NewSchemaInput onChange={onChange} name="subtitle_must_contain" value={section.subtitle_must_contain} label="Subtitle must contain" placeholder=''/>
		</View>
	)
}

export default (props: any) => {
	const { state, actions } = useContext(StateContext)
	
	// return behavior
	useEffect(() => {
		props.navigation.addListener('beforeRemove', (e: any) => actions.setScreens({ schemas: true }))
	}, [props.navigation])
	
	useEffect(() => {
		if (props.route.params && props.route.params.source) {
			// console.debug('...editing schema', props.route.params.source)
			state.feedService.findBySource(props.route.params.source)
				.then(res => {
					let newFeed = {...res.feed}
					newFeed.sections = new Map<number, Section>()

					res.feed.sections.forEach((v, i) => {
						const sec: Section = {
							section_selector: v.section_selector || '',
							subtitle_must_contain: v.subtitle_must_contain || '',
							subtitle_selector: v.subtitle_selector || '',
							title_must_contain: v.title_must_contain || '',
							title_selector: v.title_selector || '',
							url_selector: v.url_selector || '',
						}

						newFeed.sections.set(i, sec)
					})

					actions.setNewSchemaScreen(newFeed)
				})
				.catch(e => console.debug('state.feedService.findBySource', e.message))

			return
		}
	}, [])
	
	const handleChanges = (label: string, value: string | Object) => {
		actions.setNewSchemaScreen({...state.newSchemaScreen, [label]: value})
	}
	
	const handleSectionsInputChanges = (position: number, section: Section) => {
		const newSchema = new Map<number, Section>()
		Array.from(state.newSchemaScreen.sections).map((v, i) => newSchema.set(v[0], v[1]))
		
		newSchema.set(position, section)
		handleChanges('sections', newSchema)
	}
	
	const removeSection = (index: number) => {
		const newSchema = new Map<number, Section>()
		Array.from(state.newSchemaScreen.sections).map((v, i) => {
			if (index != v[0]) {
				newSchema.set(v[0], v[1])
			}
		})
		
		if (state.newSchemaScreen.sections.size === 1) return
		
		handleChanges('sections', newSchema)
	}
	
	return (
		<ScrollView style={newSchemaStyles.container}>
			<NewSchemaInput
				required={true}
				name="source"
				label="Source"
				placeholder='https://www.nytimes.com/'
				onChange={handleChanges}
				value={state.newSchemaScreen.source}/>
			<NewSchemaInput
				name="description"
				label="Description"
				placeholder='Times front page'
				onChange={handleChanges}
				value={state.newSchemaScreen.description}/>
			<NewSchemaInput
				required={true}
				name="category"
				label="Category"
				placeholder='economy'
				onChange={handleChanges}
				value={state.newSchemaScreen.category}/>
			
			<Text style={newSchemaStyles.sectionsTitle}>Sections</Text>
			
			<Sections handleChanges={handleSectionsInputChanges} removeSection={removeSection}/>
		</ScrollView>
	)
}
