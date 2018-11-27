import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CourseItem = ({ onClick, course}) =>
    (
        <div className='course-item card' onClick={onClick}>
            <div className='card-header'>
                <h4>{course.name}</h4>
            </div>
            <div className='card-body'>
                <p>{course.description}</p>
                <div className='row'>
                    <div className='col-4'>Category: {course.category}</div>
                    <div className='col-2'></div>
                    <div className='col-4'>Rating: {course.avg_rating}</div>
                </div>
            </div>
        </div>
    )
CourseItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    course: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}
export default CourseItem
