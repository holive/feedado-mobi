import State from "./state";

export default interface Screens {
	feeds: boolean
	schemas: boolean
	newSchema: boolean
}

export const setScreens = (state: State, setState: Function, screen: { [key: string]: boolean }) => {
	const newScreenState: Screens = {
		feeds: false,
		schemas: false,
		newSchema: false,
	}
	
	setState({ screens: { ...newScreenState, ...screen } });
}
