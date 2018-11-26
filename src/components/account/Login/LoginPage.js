import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {Redirect} from 'react-router-dom'
import LoginForm from './LoginForm'
import * as userActions from '../../../actions/userActions'
import toastr from 'toastr'

export class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            user: Object.assign({},this.props.user),
            loading: false,
            redirect: false,
            errors: []
        }
        this.onStateUpdate = this.onStateUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        console.log('Mounted LoginPage')
    }
    onStateUpdate(event) {
        const field = event.target.name
        const user = Object.assign({},this.state.user)

        user[field] = event.target.value
        this.setState({user})

    }
    onSubmit(event) {
        event.preventDefault()
        this.setState({loading: true})

        this.props.actions.logInUser(this.state.user)
            .then(() => this.redirect())
            .catch(err => {
                toastr.error(err)
                this.setState({loading: false})
            })
    }
    redirect() {
        this.setState({
            loading: false,
            redirect: true
        })
        toastr.success(`Logged in as ${this.state.user.username}`)
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={`/user/${this.state.user.username}/hub`} />
            )
        }
        return (
            <div className='container'>
                <LoginForm
                onChange = {this.onStateUpdate}
                onSubmit = {this.onSubmit}
                loading = {this.state.loading}
                errors = {this.state.errors}
                user = {this.state.user} />
            </div>
            )
    }
}
LoginPage.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
}
function mapStateToProps(state,ownProps) {
    return {
        user: {
            username: '',
            password: ''
        }
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(userActions,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)
