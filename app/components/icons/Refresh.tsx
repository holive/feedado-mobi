import React, { useContext } from 'react';

import Icon from "react-native-vector-icons/MaterialIcons";
import { StateContext } from "../../context/Context";

Icon.loadFont();

export const RightIconHeader = () => {
	const { state, actions } = useContext(StateContext);
	
	if (state.screens.schemas) {
		return (
			<Icon
				name="add"
				size={24}
				color="#FFF"
				onPress={() => console.log('refresh')}
			/>
		)
	}
	
	return (
		<Icon
			name="refresh"
			size={24}
			color="#FFF"
			onPress={() => console.log('refresh')}
		/>
	)
}
