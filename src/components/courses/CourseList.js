import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CourseItem from './CourseItem'

const CourseList = ({ courses, title, onClick}) =>
    (
        <div className='card'>
            <div className='card-header text-white bg-dark'>
                <h3>{title}</h3>
            </div>
            <div id={`${title.replace(' ','')}`} className='card-body course-list-body d-flex flex-row flex-wrap align-items-start course-list'
            >

                {courses.map((c,i) => <CourseItem o key={i} course={c} onClick = {onClick}/>) }
            </div>
        </div>
    )
CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
export default CourseList
