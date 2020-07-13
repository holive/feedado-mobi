import React from 'react';

import Icon from "react-native-vector-icons/MaterialIcons";

Icon.loadFont();

export default () => {
	return (
		<>
			<Icon
				name="refresh"
				size={24}
				color="#FFF"
				onPress={() => console.log('refresh')}
			/>
		</>
	)
}
