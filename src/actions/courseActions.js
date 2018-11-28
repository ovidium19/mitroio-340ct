import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as courseDb from '../api/courseApi'

function getCoursesSuccess(courses) {
    return {type: types.GET_COURSES_SUCCESS, courses}
}
export function removeCourses() {
    return {type: types.REMOVE_COURSES}
}
export function getCourses(header, options){
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return courseDb.getCourses(header,options).then(res => {
            dispatch(getCoursesSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
