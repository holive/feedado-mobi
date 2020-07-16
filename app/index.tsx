import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import HeaderTab from "./components/HeaderTab";
import Refresh from "./components/icons/Refresh";
import styles from './styles/theme.style';
import MainWrapper from "./components/MainWrapper";
import CardFeed from './components/cards/feed'

export const App = () => {
	const [showWebview, setShowWebview] = useState({ show: false, url: '' });
	const lefHeaderIcon = showWebview.show ? 'arrow-back' : 'menu';
	
	return (
		<>
			<StatusBar backgroundColor="#46494c" barStyle="light-content"/>
			
			<Header
				leftComponent={{ icon: lefHeaderIcon, color: '#fff' }}
				rightComponent={<Refresh/>}
				backgroundColor={styles.HEADER_BACKGROUND_COLOR}
			/>
			
			<HeaderTab/>
			
			<MainWrapper>
				{/*{showWebview.show ? <CardFeed/> : <CardFeed/>}*/}
				<CardFeed/>
			</MainWrapper>
		</>
	);
};
