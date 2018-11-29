import initialState from "./initialState"
import * as types from '../actions/actionTypes'

export default function courses(state=initialState.courses, action){
    switch (action.type) {
        case (types.GET_COURSES_SUCCESS): {

            return action.courses
        }
        case (types.REMOVE_COURSES): {
            return []
        }
        case (types.GET_COURSES_FOR_USER_HUB_SUCCESS): {
            return action.courses
        }
    }
    return state
}
