import  { createStore} from 'redux'
import { Reducer } from "./reducer"
import {composeWithDevTools} from 'redux-devtools-extension'

export const store = new createStore(Reducer,composeWithDevTools())