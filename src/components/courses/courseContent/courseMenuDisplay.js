import React from 'react'
import PropTypes from 'prop-types'
import CourseMenuItem from './CourseMenuItem'
const CourseMenuDisplay = ({ pages, title, onClick, currentPage }) => (
    <div className='d-flex flex-column course-page-list col-md-4 col-lg-3 bg-dark text-white'>
        <div className='course-menu-item'>
            <p className='display-5 font-weight-bold text-center'>{title}</p>
        </div>
        {
            pages.map((p,i) =>
                (<CourseMenuItem
                    key={i}
                    onClick={onClick}
                    completed={currentPage >=(i+1)}
                    page={p}
                    index={i}
                    klass={'course-menu-item '} />)
            )
        }
    </div>
)
CourseMenuDisplay.propTypes = {
    pages: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}
export default CourseMenuDisplay
