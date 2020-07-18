import Screens from "./screensState";
import NewSchema from "./newSchemaState";

export default interface State {
	screens: Screens,
	newSchema: NewSchema
}

export const initialState = {
	screens: {
		feeds: false,
		schemas: false,
		newSchema: true,
	}
} as State
