import { combineReducers } from 'redux'
import courses from './courseReducer'
import user from './userReducer'
import asyncCalls from './asyncReducer'

const rootReducer = combineReducers({
    courses,
    user,
    asyncCalls
})
export default rootReducer
