import initialState from "./initialState"
import * as types from '../actions/actionTypes'

export default function courses(state=initialState.course, action){
    switch (action.type) {
        case (types.GET_COURSE_SUCCESS): {
            return action.course
        }
        case (types.REMOVE_COURSE): {
            return {}
        }
        case (types.SET_ACTIVE_COURSE): {
            return action.course
        }
        case (types.SET_PROGRESS): {
            return Object.assign({},state,{progress: [action.progress]})
        }

    }
    return state
}
