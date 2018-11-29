import React from 'react'
import PropTypes from 'prop-types'
import StarRatingComponent from 'react-star-rating-component'
import {Line} from 'rc-progress'

const CourseItem = ({course, onClick}) => {
    let bestGrades = 0
    let progressPercent = 0
    if (course.assessments && course.assessments.length > 0) {
        bestGrades = course.assessments.reduce((p,c,i) => {
            console.log(c)
            if (p < c.grades.total_points) return c.grades.total_points
            return p
        },0)
    }
    if (course.progress && course.progress.length > 0) {
       progressPercent = Math.floor((course.progress[0].current_page / course.pages) * 100)
    }
    console.log(progressPercent)
    return (
        <div className='course-item card'>
            <div className='card-header text-light bg-dark'>
                <h4>{course.name}</h4>
            </div>
            <div className='card-body text-light bg-dark'>
                <p className='card-subtitle small my-2'>Category: <span className='course-category'>{course.category}</span></p>
                <p className='card-text px-1v course-description'>{course.description &&  course.description.substring(0,80)+'...'}</p>
                <div className='row my-2'>
                    <div className='col-4'>
                        <button className='btn btn-success text-white' courseid={course['_id']} onClick={onClick}>Details</button>
                    </div>
                    <div className='col-2' />
                    <div className='col-4 text-right'>
                        <p className='p-0 m-0 mb-1'>Course Rating</p>
                        <StarRatingComponent
                            name={course.name.replace(' ','')}
                            emptyStarColor = {'lightgray'}
                            editing={false}
                            starCount = {5}
                            value = {course.avg_rating}
                        />
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start'>
                    {course.ratings && course.ratings.length > 0 &&
                        <div className='course-user-rating w-100 row'>
                            <p className='col-5 m-0 p-0'>Your rating: </p>
                            <div className='col m-0 p-0'>
                            {
                                course.ratings.length > 0 &&
                                <StarRatingComponent
                                    name={course.name.replace(' ','')+course.ratings[0].username}
                                    emptyStarColor = {'lightgray'}
                                    editing={false}
                                    starCount = {5}
                                    value = {course.ratings[0].rating}/>
                            }
                            </div>

                        </div>
                    }
                    {
                        course.assessments && course.assessments.length > 0 &&
                        <div className='course-user-grade w-100 row'>
                            <div className='col-5 m-0 p-0'>
                                <p className='p-0 m-0'>Best Grade:</p>
                            </div>
                            <div className='col-5 m-0 p-0'>
                                <p className='p-0 m-0' style={{
                                    color: bestGrades > 50 ? 'greenyellow' : 'orange'
                                }}>{bestGrades + '%'}</p>
                            </div>
                        </div>
                    }
                    {
                        course.progress &&
                        <div className='course-progress-bar w-100 mt-auto'>
                            <div className='mb-1 text-right'>{`Progress: ${progressPercent}%`}</div>
                            <Line percent={progressPercent} strokeWidth="1" strokeColor="greenyellow" trailColor='white' />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}
export default CourseItem
