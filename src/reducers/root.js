import { combineReducers } from 'redux'
import courses from './courseListReducer'
import course from './courseReducer'
import user from './userReducer'
import asyncCalls from './asyncReducer'

const rootReducer = combineReducers({
    courses,
    course,
    user,
    asyncCalls
})
export default rootReducer
