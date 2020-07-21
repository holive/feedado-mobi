import * as React from 'react'
import { NavigationContainerRef } from '@react-navigation/native'

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef()

export const navigate = (name: any, params: any) => {
	navigationRef.current?.navigate(name, params)
}
