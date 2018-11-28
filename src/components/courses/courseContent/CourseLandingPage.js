
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import * as courseActions from '../../../actions/courseActions'
import toastr from 'toastr'
import StarRatingComponent from 'react-star-rating-component'
import LoadingIcon from '../../common/LoadingIcon'


export class CourseLandingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                username: this.props.user.username,
                id: this.props.match.params.id
            },
            updated: false,
            redirect: false
        }
    }

    componentDidMount() {
        /*
        if (!this.props.user.header) {
            this.redirectToLogin()
            return
        }
        */
        if (!this.state.updated) {
            this.props.actions.getCourseById(this.props.user.header, this.state.options)
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
        this.props.actions.removeCourse()
        this.setState({
            updated: false
        })
        console.log("Unmounting CourseLandingPage")
    }

    redirectToLogin() {
        this.setState({
            redirect: true
        })
        toastr.warning('You must login first to see this content')

    }
    render() {
        /*
        if (this.state.redirect) {
            return (
                <Redirect to='/account/login' />
            )
        }
        */
        return (
            <div className='container-fluid course-landing-content mt-3'>
                {  this.props.course.name ?
                <div className='jumbotron jumbotron-fluid bg-dark text-white'>
                    <div className='container'>
                        <h2 className='display-4'>{this.props.course.name}</h2>
                        <p className='text-muted'> Created by: {this.props.course.username} </p>
                        <p className='lead'>{this.props.course.description}</p>
                        <div className='row mt-2'>
                            <div className='col-4'>
                                <Link to={`/course/${this.props.course['_id']}/learn`} className='btn btn-success text-white'>Learn</Link>
                            </div>
                            <div className='col-2' />
                            <div className='col-4 text-right'>
                                <StarRatingComponent
                                    name={ this.props.course.name.replace(' ','')}
                                    emptyStarColor = {'lightgray'}
                                    editing={false}
                                    starCount = {5}
                                    value = {this.props.course.avg_rating}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                : <LoadingIcon />
                }
         </div>

        )
    }
}

CourseLandingPage.propTypes = {
    user: PropTypes.object.isRequired,
    course: PropTypes.object,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
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
        course: state.course,
        loading: state.asyncCallsInProgress > 0
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CourseLandingPage)
