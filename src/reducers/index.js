import { combineReducers } from 'redux'
import data         from './data'
import state        from './state'
import conversation from './conversation'

export default combineReducers({ data, state, conversation })
