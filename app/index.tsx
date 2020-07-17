import React, { useContext, useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import HeaderTab from "./components/HeaderTab";
import { RightIconHeader } from "./components/icons/Refresh";
import styles from './styles/theme.style';
import MainWrapper from "./components/MainWrapper";
import Schemas from "./components/cards/schemas";
import { Context, StateContext } from "./context/Context";
import Feed from "./components/cards/feed";

export const App = () => {
	const { state } = useContext(StateContext);
	
	return (
		<Context>
			<StatusBar backgroundColor="#46494c" barStyle="light-content"/>
			
			<Header
				leftComponent={{ icon: 'menu', color: '#fff' }}
				rightComponent={<RightIconHeader/>}
				backgroundColor={styles.HEADER_BACKGROUND_COLOR}
			/>
			
			<HeaderTab/>
			
			<MainWrapper>
				<Feed/>
				<Schemas/>
			</MainWrapper>
		</Context>
	);
};
