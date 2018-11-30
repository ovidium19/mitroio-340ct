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
function getCoursesForUserSuccess(courses) {
    return { type: types.GET_COURSES_FOR_USER_HUB_SUCCESS, courses}
}
function postGradeSuccess() {
    return {type: types.POST_GRADES_SUCCESS }
}
function rateCourseSuccess() {
    return {type: types.RATE_COURSE_SUCCESS }
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
export function setRating(rating,id) {
    return {type: types.SET_RATING, params: {
        rating,
        id
    }}
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
            console.log(err.response)
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

export function postGrades(header, data, username, courseid) {
    return (dispatch,getState) => {
        dispatch(beginAsyncOp())
        return courseDb.postGrades(header,data,username,courseid).then(res => {
            dispatch(postGradeSuccess())
            return res
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function getCoursesForUserHub(header,options) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        console.log(options)
        return courseDb.getCoursesForUser(header,options).then(res => {
            dispatch(getCoursesForUserSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
export function rateCourse(header,rating,course_id) {
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return courseDb.rateCourse(header,rating,course_id).then(res => {
            dispatch(rateCourseSuccess(res))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
