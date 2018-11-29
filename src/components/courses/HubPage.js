import {Redirect, Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'
import './Courses.less'
import toastr from 'toastr'
import LoadingIcon from '../common/LoadingIcon'

export class HubPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 6,
                username: this.props.user.username,
                random: false,
                category: ''
            },
            updated: false,
            courseClicked: ''
        }
        this.onNavigateToCourse = this.onNavigateToCourse.bind(this)
        this.onUserRatingChanged = this.onUserRatingChanged.bind(this)
    }

    componentDidMount() {
        if (!(this.props.user.header)) {
            this.redirectTo('/account/login')
            toastr.warning('You must login first to see this content')
            return
        }
        if (!this.state.updated) {
            let options = {
                username: this.state.options.username
            }

            this.props.actions.getCoursesForUserHub(this.props.user.header, options)
            .then(res => {
                this.setState({
                    updated: true
                })
            }).catch(err => {
                console.log(err.response)
                this.setState({
                    updated: true
                })
            })
        }
    }
    componentWillUnmount() {
        this.props.actions.removeCourses()
        this.setState({
            updated: false
        })
        console.log("Unmounting HubPage")
    }
    redirectTo(link) {
        this.setState({
            redirect: true,
            link
        })
    }
    onNavigateToCourse(event) {
        event.preventDefault()
        let id = event.target.attributes.courseid.nodeValue
        this.props.actions.setActiveCourse(id)
        this.props.history.push(`/course/${id}`)
    }
    onUserRatingChanged(value, prev, name, e) {
        console.log(name)
        let course = this.props.courses.find(c => c['_id'] == name)
        this.setState({
            courseClicked: name
        })
        let rating = {
            username: this.props.user.username,
            rating: value
        }
        this.props.actions.rateCourse(this.props.user.header,rating,course['_id'])
            .then(res => {
                this.props.actions.setRating(rating, course['_id'])
                console.log(res)
                this.setState({
                    courseClicked: ''
                })

            })
    }
    renderCourseList(courses,callback) {
        return (
            <React.Fragment>
                 {courses.length > 0 ?
                <CourseList
                title={'Courses you have seen'}
                courses = {courses}
                onClick = {callback}
                onUserRatingChanged = {this.onUserRatingChanged}
                courseClicked = {this.state.courseClicked} />
                :
                <p>
                {'You haven\'t progressed on any available courses. See courses at this ' }
                <Link to='/courses' >Link</Link>
                </p>
                }
            </React.Fragment>

        )
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.link} />
            )
        }
        return (
            <div className='container-fluid courses mt-3'>
            {
                this.props.courses.length > 0 ? this.renderCourseList(this.props.courses, this.onNavigateToCourse): <LoadingIcon />

            }


            </div>
        )
    }
}

HubPage.propTypes = {
    user: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object,
    loading: PropTypes.bool.isRequired
}
function mapStateToProps(state,ownProps) {
    let user = {
        header: '',
        username: state.user.username
    }
    if (state.user.hasOwnProperty('header')){
        user.header = state.user.header
    }

    return {
        user,
        courses: state.courses,
        loading: state.asyncCalls > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HubPage)
