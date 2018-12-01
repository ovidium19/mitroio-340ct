import React from 'react'
import PropTypes from 'prop-types'

const AssessmentStartPage = ({title,nr, onStart}) => (
    <React.Fragment>
        <div className='w-100'>
            <p className='display-4 page-title text-center py-3'>Assessment for {title}</p>
        </div>

        <div className='card card-body d-flex flex-column justify-content-center align-items-center start-assess'>
            <p className='card-text'>
                {`We have picked ${nr} questions for you related to this course. Each one is worth ${Math.floor(100 / nr)} points. There is no time limit`}
            </p>
            <button className='btn btn-success mt-auto' onClick={onStart}>Start Assessment</button>
        </div>
    </React.Fragment>
)

AssessmentStartPage.propTypes = {
    title: PropTypes.string.isRequired,
    nr: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired
}
export default AssessmentStartPage
