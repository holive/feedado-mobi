import React from 'react';

import { ButtonGroup } from 'react-native-elements';

import styles from '../styles/theme.style';

interface State {
	selectedIndex: number
}

class HeaderTab extends React.Component<any, State> {
	state = {
		selectedIndex: 0
	}
	
	updateIndex = (selectedIndex: any) => {
		this.setState({ selectedIndex })
	}
	
	render() {
		const { selectedIndex } = this.state
		
		return (
			<ButtonGroup
				onPress={this.updateIndex}
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
			/>
		)
	}
}

export default HeaderTab;
