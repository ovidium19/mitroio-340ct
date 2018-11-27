import {Link} from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'

export class LearnPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                page: 1,
                limit: 5,
                username: this.props.user.username,
                random: false,
                category: ''
            },
            updated: false
        }
        this.onClickCourse = this.onClickCourse.bind(this)
    }
    componentDidMount() {
        if (!this.state.updated) {
            let options = {
                page: this.state.options.page,
                limit: this.state.options.limit,
                username: this.state.options.username
            }
            if (this.state.options.random) options.random = this.state.options.random
            if (this.state.options.category) options.category = this.state.options.category

            this.props.actions.getCourses(this.props.user.header, options)
            .then(res => {
                let next = this.state.options.page + 1
                this.setState({
                    updated: true,
                    options: Object.assign({},this.state.options,{page: next})
                })
            }).catch(err => {
                console.log(err.response)
                this.setState({
                    updated: true
                })
            })
        }
    }
    onClickCourse(event) {
        console.log(event.target)
    }

    render() {
        return (
            <div className='container-fluid'>
            {this.props.courses.length > 0 ?
                <CourseList onClick={this.onClickCourse} title={'Courses available'} courses = {this.props.courses} />
                : <p>Loading courses...</p>
            }

            </div>
        )
    }
}

LearnPage.propTypes = {
    user: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
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
        courses: state.courses
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LearnPage)
