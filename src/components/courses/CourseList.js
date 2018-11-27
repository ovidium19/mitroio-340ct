import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CourseItem from './CourseItem'

const CourseList = ({ onClick, courses, title}) =>
    (
        <div className='card'>
            <div className='card-header'
            role='button'
            datatoggle='collapse'
            datatarget={`#${title.replace(' ','')}`}>

                <h1>{title}</h1>
            </div>
            <div className='card-body collapse d-flex flex-row justify-content-start align-items-start'
            id={`#${title.replace(' ','')}`}>

                {courses.map((c,i) => <CourseItem onClick={onClick} key={i} course={c}/>) }
            </div>
        </div>
    )
CourseList.propTypes = {
    onClick: PropTypes.func.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired
}
export default CourseList
