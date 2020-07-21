import React from "react"
import { View } from 'react-native'

export default (props: any) => {
	return (
		<View style={{
			backgroundColor: "#f5f5f5",
			flex: 1,
		}}>
			{props.children}
		</View>
	)
}
