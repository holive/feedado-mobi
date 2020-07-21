import { Input } from "react-native-elements"
import React from "react"
import { newSchemaStyles } from "./styles"

export const NewSchemaInput = (props: any) => {
	return (
		<Input
			value={props.value}
			label={props.label}
			placeholder={props.placeholder}
			labelStyle={newSchemaStyles.label}
			inputStyle={newSchemaStyles.input}
			inputContainerStyle={newSchemaStyles.inputContainer}
			containerStyle={newSchemaStyles.containerStyle}
		/>
	)
}
