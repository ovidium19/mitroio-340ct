import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/root'
import initialState from '../reducers/initialState'
import thunk from 'redux-thunk'
import * as courseActions from '../actions/courseActions'
import * as env from '../constants'
import nock from 'nock'
import axios from 'axios'


describe("Integration tests for redux - store,reducers and actions", () => {
    beforeAll(() => {
        axios.defaults.adapter = require('axios/lib/adapters/http')
        console.log('Setting axios adapter')
    })
    afterEach(() => {
        nock.cleanAll()
    })

    test('removeCourse - it should remove current stored course', async done => {
        let initState = Object.assign({},initialState,{course: {title:'A'}})
        let store = createStore(rootReducer, initState )

        console.log(store.getState().course)
        const action = courseActions.removeCourse()
        store.dispatch(action)
        const result = store.getState().course
        expect(result).toEqual({})

        done()

    })

    test('removeCourses - it should remove all courses from the list', async done => {
        let initState = Object.assign({},initialState,{courses: [{title:'A'},{title: 'B'}]})
        let store = createStore(rootReducer, initState )
        const action = courseActions.removeCourses()
        store.dispatch(action)
        const result = store.getState().courses
        expect(result).toEqual([])
        done()
    } )

    test('setProgress - it sets the progress attribute of the current course to param', async done => {
        let course = {
            progress: [
                {
                    username: 'ovidium19',
                    finished: false,
                    page: 1
                }
            ]
        }
        let initState = Object.assign({},initialState,{course})
        let store = createStore(rootReducer, initState )
        const expectedResult = {
            username: 'ovidium19',
            finished: true,
            page: 2
        }
        const action = courseActions.setProgress(expectedResult)

        store.dispatch(action)
        const result = store.getState().course

        expect(result.progress[0]).toEqual(expectedResult)
        done()
    })
    test('setRating - should correctly change a course from the list to the new rating', async done => {
        //setup
        let courses = [
            {
                _id: 1
            },
            {
                _id: 2,
                ratings: [
                    {
                        username: 'ovi',
                        rating: 2
                    }
                ]
            }
        ]
        let initState = Object.assign({},initialState,{courses})
        let store = createStore(rootReducer, initState )
        //test
        const expectedResult = {
            username: 'ovidium19',
            rating: 3
        }
        const action = courseActions.setRating(expectedResult,2)

        store.dispatch(action)
        const result = store.getState().courses

        expect(result[1].ratings[0]).toEqual(expectedResult)
        done()
    })
    test('setActiveCourse - one of the courses selected will be copied in the store.course', async done => {
        //setup
        let courses = [
            {
                _id: 1
            },
            {
                _id: 2,
                ratings: [
                    {
                        username: 'ovi',
                        rating: 2
                    }
                ]
            }
        ]
        let initState = Object.assign({},initialState,{courses})
        let store = createStore(rootReducer, initState, applyMiddleware(thunk))
        const expectedResult = {
           _id: 1
        }
        const action = courseActions.setActiveCourse(1)

        store.dispatch(action)
        const result = store.getState().course
        expect(result).toEqual(expectedResult)
        done()
    })
    test('getCourses - list of courses received from http response set to state.courses', async done => {
        let courses = [
            {
                _id: 1
            },
            {
                _id: 2,
                ratings: [
                    {
                        username: 'ovi',
                        rating: 2
                    }
                ]
            }
        ]
        nock(env.BASE_URL)
        .options(env.BASE_API_PATH)
        .reply(204)
        .persist()

        nock(env.BASE_URL)
        .get(env.BASE_API_PATH)
        .reply(200, courses, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'content-type': 'application/json'
        })


        let store = createStore(rootReducer, initialState, applyMiddleware(thunk))
        const expectedResult = courses
        const action = courseActions.getCourses('',{})

        store.dispatch(action).then(
            res => {
                const result = store.getState().courses
                expect(result).toEqual(expect.arrayContaining(expectedResult))
                done()
            }
        )


    })
})
