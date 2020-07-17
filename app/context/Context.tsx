import React, { useState } from "react";

interface Screens {
	feeds: boolean
	schemas: boolean
}

interface State {
	screens: Screens,
}

const initialState = {
	screens: {
		feeds: true,
		schemas: false,
	}
} as State

export const StateContext = React.createContext(
	{
		state: initialState,
		actions: {
			setScreens: (screen: { [key: string]: boolean }) => {},
		}
	}
);

const setScreens = (state: State, setState: Function, screen: { [key: string]: boolean }) => {
	const newScreenState: Screens = {
		feeds: false,
		schemas: false,
	}
	
	setState({ screens: { ...newScreenState, ...screen } });
}

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
