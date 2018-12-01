import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import * as courseActions from '../../../actions/courseActions'
import toastr from 'toastr'
import LoadingIcon from '../../common/LoadingIcon'
import AssessmentStartPage from './AssessmentStartPage'
import AssessmentQuestion from './AssessmentQuestion'
import AssessmentEndScreen from './AssessmentEndScreen'
import _ from 'underscore'
import { Line } from 'rc-progress'
import './Assessment.less'

export class AssessmentPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            link: '/',
            current_question: -1,
            assessReport: {
                elements: [],
                total_points: 0
            },
            available_answers: [],
            selected_answer: '',
            score: 0

        }
        this.onStartAssessment  = this.onStartAssessment.bind(this)
        this.onSelectAnswer = this.onSelectAnswer.bind(this)
        this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
    }

    componentDidMount() {
        if (!(this.props.user.header)) {
            this.redirectTo('/account/login')
            toastr.warning('You must login first to see this content')
            return
        }
        let progress = this.props.progress
        if (progress.length == 0 || !(progress[0].finished)) {
            this.redirectTo(`/course/${this.props.match.params.id}`)
            toastr.warning('You haven\'t completed the course. Finish course to take assesssment')
            return
        }
    }

    onStartAssessment(event) {
        event.preventDefault()
        this.loadNextQuestion()
    }

    loadNextQuestion() {
        let next = this.state.current_question + 1
        let finished = next >= this.props.questions.length
        this.setState({
            current_question: next,
            available_answers: finished ? [] : _.shuffle(this.props.questions[next].possible_answers),
            selected_answer: ''
        }, () => {
            if (finished) {
                //make API call to save the grade.
                let data = {
                    grades: this.state.assessReport,
                    passed: this.state.assessReport.total_points > 49
                }

                this.props.actions.postGrades(this.props.user.header, data, this.props.user.username, this.props.course['_id'])

            }
        })

    }
    onSelectAnswer(event) {

        this.setState({
            selected_answer: event.target.innerHTML
        })
    }
    onSubmitAnswer(event) {
        let correct_answer = this.state.selected_answer === this.props.questions[this.state.current_question].correct_answer
        let points =  Math.floor(100 / this.props.questions.length)
        let report = {
            answer: this.state.selected_answer,
            correct: correct_answer,
            points: correct_answer ? points : 0
        }
        this.setState({
            assessReport: {
                elements: this.state.assessReport.elements.concat([report]),
                total_points: this.state.assessReport.total_points + report.points
            }
        })
        this.loadNextQuestion()
    }
    redirectTo(link) {
        this.setState({
            redirect: true,
            link
        })
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.link} />
            )
        }
        let progressPercent = Math.floor(100 / this.props.questions.length) * this.state.current_question + Math.floor( 50 / this.props.questions.length)
        return (
            <div className='container-fluid course-landing-content row px-0 mx-0'>
                {this.state.current_question < 0 &&
                    <AssessmentStartPage
                    title = {this.props.course.name}
                    nr = {this.props.questions.length}
                    onStart = {this.onStartAssessment} />
                }
                {this.state.current_question >= 0 && this.state.current_question < this.props.questions.length &&
                    <div className='p-3 m-0 w-100'>
                        <p className='lead mb-3 text-center'>{`${this.props.course.name} - Assessment`}</p>
                        <p className='text-muted text-center'>{`Question ${this.state.current_question+1}`}</p>
                        <Line percent={progressPercent} strokeWidth="1" strokeColor="greenyellow" />
                        <AssessmentQuestion
                            text={this.props.questions[this.state.current_question].text}
                            answers = {this.state.available_answers}
                            onSelect = {this.onSelectAnswer}
                            selected_answer = {this.state.selected_answer}
                             />
                        {
                            this.state.selected_answer &&
                            <div className='question-answer-submit text-center mt-2'>
                                <button className='btn btn-dark text-white m-auto' onClick={this.onSubmitAnswer}>Submit Answer</button>
                            </div>
                        }

                    </div>

                }

                {this.state.current_question >= this.props.questions.length &&
                    <div className='p-3 m-0 w-100'>
                        <p className='lead mb-3 text-center'>{`${this.props.course.name} - Assessment`}</p>
                        <AssessmentEndScreen
                        points = {this.state.assessReport.total_points}
                        username={this.props.user.username}
                        courseid={this.props.course['_id']} />
                    </div>
                }
                {this.props.loading &&
                    <LoadingIcon />
                }
            </div>
        )
    }
}
AssessmentPage.propTypes = {
    user: PropTypes.object.isRequired,
    course: PropTypes.object,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    progress: PropTypes.array,
    questions: PropTypes.array.isRequired
}
function mapStateToProps(state,props) {
    let user = {
            header: '',
            username: state.user.username
        }
        if (state.user.hasOwnProperty('header')){
            user.header = state.user.header
        }

    return {
        user,
        course: state.course,
        loading: state.asyncCallsInProgress > 0,
        progress: state.course.progress && state.course.progress.length > 0 ? [state.course.progress.find(p => p.username == user.username)] : [],
        questions: state.course.content ?  _.sample(state.course.content.assessments, 5) : []
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AssessmentPage)
