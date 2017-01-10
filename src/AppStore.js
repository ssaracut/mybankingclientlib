import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise'

import SessionReducer from './session/SessionReducer'
import AccountsReducer from './accounts/AccountsReducer'

export default createStore(combineReducers({ SessionReducer, AccountsReducer }), applyMiddleware(promiseMiddleware));