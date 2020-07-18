import React, { useState } from "react";
import { setScreens } from "./screensState";
import State, { initialState } from "./state";


export const Context = (props: { children: React.ReactNode; }) => {
	const [state, _setState] = useState(initialState);
	
	const setState = (_state: State) => {
		const newState = { ...state, ..._state };
		_setState(newState);
	};
	
	const actions = {
		setScreens: setScreens.bind(null, state, setState),
	};
	
	return (
		<StateContext.Provider value={{ state, actions }}>
			{props.children}
		</StateContext.Provider>
	);
}

export const StateContext = React.createContext(
	{
		state: initialState,
		actions: {
			setScreens: (screen: { [key: string]: boolean }) => {},
		}
	}
);
