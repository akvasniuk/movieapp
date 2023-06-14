import {createStore} from "redux"
import {defaultReducer} from "./reducers/defaultReducer";

export const store  = createStore(defaultReducer)