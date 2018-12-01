import React from 'react'
import PropTypes from 'prop-types'

const AssessmentAnswer = ({answer, onClick, klass}) => (
    <div className='question-answer p-0 m-0' >
        <p className={`w-100 h-100 m-0 ${klass} question-answer-text pl-4 py-3`} id={'answer'+answer.toLowerCase().replace(' ','')} onClick={onClick}>{answer}</p>
    </div>
)

AssessmentAnswer.propTypes = {
    answer: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
export default AssessmentAnswer
