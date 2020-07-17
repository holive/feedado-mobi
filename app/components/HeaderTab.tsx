import React, { useContext, useState } from 'react';
import { ButtonGroup } from 'react-native-elements';
import styles from '../styles/theme.style';
import { StateContext } from "../context/Context";

const HeaderTab = () => {
	const { state, actions } = useContext(StateContext);
	const [selectedIndex, setSelectedIndex] = useState(0);
	
	const updateIndex = (selectedIndex: any) => {
		setSelectedIndex(selectedIndex);
		if (selectedIndex == 0) {
			actions.setScreens({ feeds: true });
			return;
		}
		actions.setScreens({ schemas: true });
	}
	
	return <ButtonGroup
		onPress={updateIndex}
		selectedIndex={selectedIndex}
		buttons={["FEEDS", "SCHEMAS"]}
		innerBorderStyle={{ width: 0 }}
		textStyle={{ color: "#979798", fontSize: 14 }}
		selectedTextStyle={{ color: "#fff" }}
		containerStyle={{
			height: 48,
			marginLeft: 0,
			marginRight: 0,
			marginBottom: 0,
			marginTop: -1,
			borderWidth: 0,
			borderRadius: 0
		}}
		buttonContainerStyle={{
			backgroundColor: styles.HEADER_BACKGROUND_COLOR,
		}}
		buttonStyle={{
			borderBottomWidth: 4,
			borderBottomColor: styles.HEADER_BACKGROUND_COLOR,
		}}
		selectedButtonStyle={{
			backgroundColor: styles.HEADER_BACKGROUND_COLOR,
			borderBottomColor: styles.ORANGE,
		}}
	/>;
}

export default HeaderTab;
