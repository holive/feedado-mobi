import React, { useContext, useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import HeaderTab from "./components/HeaderTab";
import styles from './styles/theme.style';
import MainWrapper from "./components/MainWrapper";
import Schemas from "./components/cards/Schemas";
import { Context, StateContext } from "./context/Context";
import Feed from "./components/cards/Feed";
import NewSchema from "./components/cards/NewSchema";
import { LeftIconsdHeader, RightIconHeader } from "./components/icons/ReaderIcons";

export const App = () => {
	const { state } = useContext(StateContext);
	
	return (
		<Context>
			<StatusBar backgroundColor="#46494c" barStyle="light-content"/>
			
			<Header
				leftComponent={<LeftIconsdHeader/>}
				rightComponent={<RightIconHeader/>}
				backgroundColor={styles.HEADER_BACKGROUND_COLOR}
			/>
			
			<HeaderTab/>
			
			<MainWrapper>
				<Feed/>
				<Schemas/>
				<NewSchema />
			</MainWrapper>
		</Context>
	);
};
