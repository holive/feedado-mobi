import { StatusBar, View } from "react-native"
import { Header } from "react-native-elements"
import { LeftIconsdHeader, RightIconHeader } from "../icons/ReaderIcons"
import styles from "../../styles/theme.style"
import HeaderTab from "./HeaderTab"
import React from "react"

export const CustomHeader = (props: any) => {
	return (
		<View>
			<StatusBar backgroundColor="#46494c" barStyle="light-content"/>
			
			<Header
				leftComponent={<LeftIconsdHeader/>}
				rightComponent={<RightIconHeader/>}
				backgroundColor={styles.HEADER_BACKGROUND_COLOR}
			/>
			
			<HeaderTab/>
		</View>
	)
}
