import { View } from "react-native"
import React from "react"
import { NewSchemaInput } from "./input"
import { sectionsStyles } from "./styles"
import AddRemoveSchemaSection from "../../icons/AddSchemaSection"
import { Feed, Section } from "../../../feed/feed"

const newEmptySection: Section = {
	section_selector: '',
	title_selector: '',
	title_must_contain: '',
	subtitle_selector: '',
	subtitle_must_contain: '',
	url_selector: '',
}

export const Sections = (props: { schema: Feed, setSchema: Function }) => {
	const addSection = () => {
		const newSchema = {...props.schema}
		newSchema.sections.push(newEmptySection)
		props.setSchema(newSchema)
	}
	
	return (
		<View style={sectionsStyles.container}>
			{props.schema.sections.map(RenderSection)}
			
			<AddRemoveSchemaSection callback={addSection}/>
		</View>
	)
}

const RenderSection = (props: Section, index: number) => {
	return (
		<View style={sectionsStyles.section} key={index}>
			<NewSchemaInput value={props.section_selector} label="Section selector" placeholder='.row.management section'/>
			<NewSchemaInput value={props.title_selector} label="Title selector" placeholder='.text-wrapper h3'/>
			<NewSchemaInput value={props.title_must_contain} label="Title must contain (optional)" placeholder='covid'/>
			<NewSchemaInput value={props.subtitle_selector} label="Subtitle selector (optional)" placeholder='.text-wrapper p'/>
			<NewSchemaInput value={props.subtitle_must_contain} label="Subtitle must contain (optional)" placeholder=''/>
			<NewSchemaInput value={props.url_selector} label="URL selector" placeholder='a'/>
		</View>
	)
}
