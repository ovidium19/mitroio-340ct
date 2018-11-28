import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as courseDb from '../api/courseApi'

function getCoursesSuccess(courses) {
    return {type: types.GET_COURSES_SUCCESS, courses}
}
function getCourseSuccess(course) {
    return {type: types.GET_COURSE_SUCCESS, course}
}
function updateProgressSuccess() {
    return {type: types.UPDATE_COURSE_PROGRESS_SUCCESS }
}
export function removeCourses() {
    return {type: types.REMOVE_COURSES}
}
export function removeCourse() {
    return {type: types.REMOVE_COURSE}
}
export function setProgress(progress) {
    return {type: types.SET_PROGRESS, progress}
}
export function goToNextPage(page) {
    return {type: types.GO_TO_NEXT_PAGE, page}
    //here ... set display_page and if bigger than progress.current_page, update progress
}
export function setActiveCourse(id) {
    return (dispatch,getState) => {
        const {courses} = getState()
        let course = courses.find(c => c['_id'] === id)
        dispatch({
            type: types.SET_ACTIVE_COURSE,
            course
        })
    }
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
export function getCourseById(header, options) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return courseDb.getCourseById(header,options).then(res => {
            dispatch(getCourseSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function updateProgress(header, progressReport, id) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return courseDb.updateProgress(header,progressReport,id).then(res => {
            dispatch(updateProgressSuccess())
            return res
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
