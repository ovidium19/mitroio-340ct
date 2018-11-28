
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect, Link} from 'react-router-dom'
import * as courseActions from '../../../actions/courseActions'
import toastr from 'toastr'
import LoadingIcon from '../../common/LoadingIcon'
import CourseMenuDisplay from './courseMenuDisplay'
import PageRedacter from './PageRedacter'
import './Page.less'


export class CourseContentPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                username: this.props.user.username,
                id: this.props.match.params.id
            },
            currentPage: this.props.progress.length > 0 ? this.props.progress[0].current_page : 1,
            redirect: false
        }
        this.onMenuItemClick = this.onMenuItemClick.bind(this)
        this.onNextPage = this.onNextPage.bind(this)
    }

    componentDidMount() {

        if (!this.props.user.header) {
            this.redirectToLogin()
            return
        }
            this.props.actions.getCourseById(this.props.user.header, this.state.options)
            .then(result => {
                this.updateProgress().then(res => {
                    this.props.actions.setProgress(res)
                }).catch(err => {
                    this.setState({
                        currentPage: this.props.progress[0].current_page
                    })
                })

            }).catch(err => {
                console.log(err.response)


            })
        }


    componentWillUnmount() {
        this.props.actions.removeCourse()
        console.log("Unmounting CourseContentPage")
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    async updateProgress(update) {
        //just started course, update progress to the db for this user
        let course = this.props.course
        if (!(update)) {
            if (course.progress.length == 0) {
                let progressReport = {
                    username: this.props.user.username,
                    current_page: 1,
                    finished: course.pages == 1
                }

                try{
                    let dbRes = await this.props.actions.updateProgress(this.props.user.header,progressReport,course['_id'])
                    return Promise.resolve(progressReport)
                }
                catch(err){
                    console.log(err.response)
                }

            }
            //if we have a progress report, load that into component state
            else {
                return Promise.reject("Already there")
            }
        }

        else{
            let progress = Object.assign({},this.props.course.progress[0])


        }

        //when progress report changes, update db progress report for this user
    }
    onMenuItemClick(event){
        event.preventDefault()
        let id = event.target.attributes.dataindex.nodeValue
        this.setState({
            currentPage: parseInt(id) + 1
        })
    }
    onNextPage(event) {
        event.preventDefault()
        let newPage = this.state.currentPage + 1
        this.setState({
            currentPage: newPage
        })
        if (newPage > this.props.progress[0].current_page ){
            //advancing to a new page, requires progress report update
            let course = this.props.course
            let progressReport = Object.assign({},this.props.progress[0],{
                current_page: newPage,
                finished: newPage >= course.pages
            })
            console.log(progressReport)
            this.props.actions.updateProgress(this.props.user.header,progressReport,course['_id'])
                .then(res => {this.props.actions.setProgress(progressReport)}).catch(err => console.log(err.response))

        }
        else {

            //Just navigating pages, no progress update

        }
    }
    redirectToLogin() {
        this.setState({
            redirect: true
        })
        toastr.warning('You must login first to see this content')

    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to='/account/login' />
            )
        }

        return (
            <div className='container-fluid course-landing-content row px-0 mx-0'>
                {  this.props.course.content ?
                (
                    <React.Fragment>
                        <div className='col-md-8 col-lg-9'>
                            <PageRedacter page={this.props.course.content.pages[this.state.currentPage-1]} />
                            <button className='btn btn-primary' onClick={this.onNextPage}>Next Page</button>
                        </div>
                        <CourseMenuDisplay
                        title={this.props.course.name}
                        pages={this.props.course.content.pages}
                        onClick={this.onMenuItemClick}
                        currentPage={this.props.progress ? this.props.progress[0].current_page : 0 } />
                    </React.Fragment>
                  )
                : <LoadingIcon />
                }
         </div>

        )
    }
}

CourseContentPage.propTypes = {
    user: PropTypes.object.isRequired,
    course: PropTypes.object,
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    progress: PropTypes.array
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
        loading: state.asyncCallsInProgress > 0,
        progress: state.course.progress ? [state.course.progress.find(p => p.username == user.username)] : []
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CourseContentPage)
