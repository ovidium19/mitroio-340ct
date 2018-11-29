import React from 'react'
import PropTypes from 'prop-types'
import AssessmentAnswer from './AssessmentAnswer'


const AssessmentQuestion = ({answers, onSelect, selected_answer, text}) => (
    <div className='question-box card'>
            <div className='card-header px-2'>
                <p>{text}</p>
            </div>
            <div className='card-body p-0 m-0'>
            {
                answers.map((a,i) => (
                    <AssessmentAnswer
                    key={i}
                    answer={a}
                    onClick={onSelect}
                    klass={selected_answer === a ? 'active' : ''} />
                ))
            }
            </div>
    </div>
)
AssessmentQuestion.propTypes = {
    answers: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected_answer: PropTypes.string,
    text: PropTypes.string.isRequired
}

export default AssessmentQuestion
