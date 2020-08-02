import { ScrollView } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { StateContext } from "../context/Context"
import { NewSchemaInput, newSchemaStyles } from "./cards/NewFeedComponent";
import { Config, MAX_FEEDS_BY_CATEGORY } from "../config/config";

export default () => {
	const { state, actions } = useContext(StateContext)
	const [maxFeeds, setMaxFeeds] = useState('0')
	
	useEffect(() => {
		console.debug('test config: ', state.config.max_feeds_by_category)
		
		state.configService.get().then((res: Config) => actions.setConfig(res))
	}, [])
	
	const handleChanges = (name: string, value: string) => {
		// setMaxFeeds(value.replace(/[^0-9]/g, ''))
		
		actions.setConfig({
			[name]: value.replace(/[^0-9]/g, '')
		} as unknown as Config)
	}
	
	return (
		<ScrollView style={newSchemaStyles.container}>
			<NewSchemaInput
				keyboardType='numeric'
				required={true}
				name={MAX_FEEDS_BY_CATEGORY}
				label="Store maximum feeds by category"
				placeholder='12'
				onChange={handleChanges}
				value={state.config.max_feeds_by_category}/>
				
		</ScrollView>
	)
}
