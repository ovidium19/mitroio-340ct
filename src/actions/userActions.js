import * as types from './actionTypes'
import {beginAsyncOp, asyncError } from './asyncActions'
import * as userDb from '../api/authApi'

export function logInUserSuccess(user){
    return {type: types.USER_LOG_IN_SUCCESS, user}
}

export function logInUser(credentials){
    return (dispatch, getState) => {
        dispatch(beginAsyncOp())
        return userDb.login(credentials).then(res => {
            dispatch(logInUserSuccess(Object.assign({},res)))
        }).catch(err => {
            dispatch(asyncError(err))
            throw(err)
        })
    }
}
