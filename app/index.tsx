import 'react-native-gesture-handler'
import React from 'react'
import MainWrapper from "./components/MainWrapper"
import FeedsComponent from "./components/cards/FeedsComponent"
import { Context } from "./context/Context"
import RssComponent from "./components/cards/RssComponent"
import NewFeed from './components/cards/NewFeed'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FEEDS, NEW_FEED, RSS } from "./variables"
import { navigationRef } from './routes/RootNavigation'
import { CustomHeader } from "./components/Header/CustomHeader"

const Stack = createStackNavigator()

export const App = () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<Context>
				<CustomHeader/>
				
				<MainWrapper>
					<Stack.Navigator initialRouteName={RSS} headerMode='none'>
						<Stack.Screen name={RSS} component={RssComponent}/>
						<Stack.Screen name={FEEDS} component={FeedsComponent}/>
						<Stack.Screen name={NEW_FEED} component={NewFeed}/>
					</Stack.Navigator>
				</MainWrapper>
			</Context>
		</NavigationContainer>
	)
}
