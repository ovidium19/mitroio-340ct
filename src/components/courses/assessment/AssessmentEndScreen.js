import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const AssessmentEndScreen = ({points, username, courseid}) => {
    let result = points > 49
    let message
    let hint
    if (result) {
        message = (<span>Congratulations</span>)
        hint = (
            <React.Fragment>
                <span>{'You have successfully passed the assessment with '}</span>
                <p className='text-center display-4 text-success score'>{`${points}%`}</p>
            </React.Fragment>
        )
    }
    else {
        message = (<span>{'Unfortunately, you haven\'t passed'}</span>)
        hint = (
            <React.Fragment>
                <span>{'You failed to pass with '}</span>
                <p className='text-center display-4 text-danger score'>{`${points}%`}</p>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <div className='text-center'>
            <div className='text-center lead my-3'>{message}</div>
            <div className='text-center'>{hint}</div>
            <div className='mt-3 d-flex justify-content-around'>
                <Link to={`/user/${username}/hub`} className='btn btn-success' >Your Hub</Link>
                <Link to={`/course/${courseid}`} className='btn btn-success'>See Course Content</Link>
            </div>
            </div>
        </React.Fragment>
    )
}

AssessmentEndScreen.propTypes = {
    points: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    courseid: PropTypes.string.isRequired
}
export default AssessmentEndScreen
