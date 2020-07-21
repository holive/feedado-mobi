import 'react-native-gesture-handler'
import React from 'react'
import MainWrapper from "./components/MainWrapper"
import Feeds from "./components/cards/Feeds"
import { Context } from "./context/Context"
import Rss from "./components/cards/Rss"
import NewFeed from './components/cards/NewFeed'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FEEDS, NEW_FEED, RSS } from "./variables"
import { navigationRef } from './routes/RootNavigation'
import { CustomHeader } from "./components/Header/CustomHeader"

const Stack = createStackNavigator()

export const App = () => {
	return (
		<Context>
			<NavigationContainer ref={navigationRef}>
				<CustomHeader/>
				
				<MainWrapper>
					<Stack.Navigator initialRouteName={RSS} headerMode='none'>
						<Stack.Screen name={RSS} component={Rss}/>
						<Stack.Screen name={FEEDS} component={Feeds}/>
						<Stack.Screen name={NEW_FEED} component={NewFeed}/>
					</Stack.Navigator>
				</MainWrapper>
			</NavigationContainer>
		</Context>
	)
}
