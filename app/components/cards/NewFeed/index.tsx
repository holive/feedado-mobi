import React, { useContext, useState } from "react"
import { ScrollView, Text } from "react-native"
import { newSchemaStyles } from "./styles"
import { NewSchemaInput } from "./input"
import { Sections } from "./sections"
import { StateContext } from "../../../context/Context"
import { Feed } from "../../../feed/feed"

const schemaInitialState: Feed = {
	source: 'google.com',
	description: 'alguma descriçao',
	category: 'tech',
	sections: [
		{
			section_selector: '.row.management section',
			title_selector: '.text-wrapper h3',
			title_must_contain: 'covid',
			subtitle_selector: '.text-wrapper p',
			subtitle_must_contain: 'bozo',
			url_selector: 'a',
		},
	]
}

export default () => {
	const { state, actions } = useContext(StateContext)
	const [schema, setSchema] = useState(schemaInitialState)
	
	return (
		<ScrollView style={newSchemaStyles.container}>
			<NewSchemaInput label="Source" placeholder='https://www.nytimes.com/' value={schema.source}/>
			<NewSchemaInput label="Description" placeholder='Times front page' value={schema.description}/>
			<NewSchemaInput label="Category" placeholder='economy' value={schema.category}/>
			
			<Text style={newSchemaStyles.sectionsTitle}>Sections</Text>
			
			<Sections schema={schema} setSchema={setSchema}/>
		</ScrollView>
	)
}
