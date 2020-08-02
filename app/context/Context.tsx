import React, { useState } from "react"
import State, { getInitialState, newSchemaScreenInitialState } from "./state"
import { Feed, Section } from "../feed/feed";

const initialState = getInitialState()

export const StateContext = React.createContext(
	{
		state: initialState,
		actions: {
			setScreens: (screen: { [key: string]: boolean }) => {},
			setCategories: (categories: Array<{ [key: string]: string }>) => {},
			setCurrentCategory: (category: string) => {},
			setNewSchemaScreen: (schema: Feed) => {},
			cleanNewSchemaScreen: () => {},
			handleNewScreenSectionFields: (index: number, fieldName: string, value: string) => {},
			setIsEditingSchema: (isEditing: boolean) => {},
			setIsLoading: (isEditing: boolean) => {},
		}
	}
)

export const Context = (props: { children: React.ReactNode }) => {
	const [state, _setState] = useState(initialState)
	
	const setState = (_state: State) => {
		const newState = { ...state, ..._state }
		_setState(newState)
	}
	
	const actions = {
		setScreens: setScreens.bind(null, state, setState),
		setCategories: setCategories.bind(null, state, setState),
		setCurrentCategory: setCurrentCategory.bind(null, state, setState),
		setNewSchemaScreen: setNewSchemaScreen.bind(null, state, setState),
		cleanNewSchemaScreen: cleanNewSchemaScreen.bind(null, state, setState),
		handleNewScreenSectionFields: handleNewScreenSectionFields.bind(null, state, setState),
		setIsEditingSchema: setIsEditingSchema.bind(null, state, setState),
		setIsLoading: setIsLoading.bind(null, state, setState),
	}
	
	return (
		<StateContext.Provider value={{ state, actions }}>
			{props.children}
		</StateContext.Provider>
	)
}

const setIsLoading = (state: State, setState: Function, loading: boolean) => {
	setState({ isLoading: loading })
}

const setCategories = (state: State, setState: Function, categories: Array<{ [key: string]: string }>) => {
	setState({ categories: categories })
}

const setCurrentCategory = (state: State, setState: Function, category: string) => {
	setState({ currentCategory: category })
}

const setNewSchemaScreen = (state: State, setState: Function, schema: Feed) => {
	setState({ newSchemaScreen: schema })
}

const cleanNewSchemaScreen = (state: State, setState: Function) => {
	setState({ newSchemaScreen: {...newSchemaScreenInitialState} })
}

const handleNewScreenSectionFields = (state: State, setState: Function, index: number, fieldName: string, value: string) => {
	const newState = { ...state }
	const newSection = newState.newSchemaScreen.sections.get(index) as Section
	// @ts-ignore
	newSection[fieldName] = value
	
	newState.newSchemaScreen.sections.set(index, newSection)
	setState({ newSchemaScreen: newState.newSchemaScreen })
}

const setIsEditingSchema = (state: State, setState: Function, isEditing: boolean) => {
	const newScreenState: Screens = {
		feeds: false,
		schemas: false,
		newSchema: true,
	}
	
	setState({ isEditingSchema: isEditing, screens: newScreenState })
}

export default interface Screens {
	feeds: boolean
	schemas: boolean
	newSchema: boolean
}

const setScreens = (state: State, setState: Function, screen: { [key: string]: boolean }) => {
	const newScreenState: Screens = {
		feeds: false,
		schemas: false,
		newSchema: false,
	}
	
	setState({ screens: { ...newScreenState, ...screen } })
}
