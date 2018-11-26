import React from 'react'
import { connect} from 'react-redux'
import {Route} from 'react-router-dom'
import PropTypes from  'prop-types'
import LoginPage from './Login/LoginPage'


class Account extends React.Component {
    constructor(props, context){
        super(props,context)
    }
    render() {
        return (
        <React.Fragment>
            <Route exact path={`${this.props.match.path}/login`} component = {LoginPage}/>
        </React.Fragment>
        )
    }
  }

Account.propTypes = {
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.asyncInProgress > 0
    }
}

export default connect(mapStateToProps)(Account)
