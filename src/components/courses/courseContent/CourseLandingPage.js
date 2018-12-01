
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'


export const CourseLandingPage = ({course}) =>
        (
            <div className='container-fluid course-landing-content mt-3'>
                {  course.name ?
                <div className='jumbotron jumbotron-fluid bg-dark text-white'>
                    <div className='container'>
                        <h2 className='display-4'>{course.name}</h2>
                        <p className='text-muted'> Created by: {course.username} </p>
                        <p className='lead'>{course.description}</p>
                        <div className='row mt-2'>
                            <div className='col-4'>
                                <Link to={`/course/${course['_id']}/learn`} className='btn btn-success text-white'>Learn</Link>
                            </div>
                            <div className='col-2' />
                            <div className='col-4 text-right'>
                                <StarRatingComponent
                                    name={course.name.replace(' ','')}
                                    emptyStarColor = {'lightgray'}
                                    editing={false}
                                    starCount = {5}
                                    value = {course.avg_rating}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                : <Redirect to='/courses' />
                }
         </div>
     )

CourseLandingPage.propTypes = {
    course: PropTypes.object
}
function mapStateToProps(state,ownProps) {
    let user = {
        username: state.user.username
    }

    return {
        user,
        course: state.course
    }
}

export default connect(mapStateToProps)(CourseLandingPage)
