import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

const CourseItem = ({course}) =>
    (
        <div className='course-item card'>
            <div className='card-header text-light bg-dark'>
                <h4>{course.name}</h4>
            </div>
            <div className='card-body text-light bg-dark'>
                <p className='card-subtitle small my-2'>Category: <span className='course-category'>{course.category}</span></p>
                <p className='card-text px-1v course-description'>{course.description &&  course.description.substring(0,80)+'...'}</p>
                <div className='row mt-2'>
                    <div className='col-4'>
                        <Link to={`/courses/${course['_id']}`} className='btn btn-success text-white'>Learn</Link>
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
    )
CourseItem.propTypes = {
    course: PropTypes.object.isRequired
}
export default CourseItem
