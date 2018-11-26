import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import UserMenu from './UserMenu'
import AccountMenu from './AccountMenu'
import './Header.less'
const Header = ({location, username, logged}) => {
    console.log(location)
    if (/(login|register)$/g.test(location.pathname)){
        return null
    }

    return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img className='material-icons md-light md-48' src='/brand.png'/> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navLinks">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navLinks">
                <UserMenu {...{username,logged}} />
                <AccountMenu {...{username,logged}} />
            </div>
    </nav>
)}
Header.propTypes = {
    location: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    logged: PropTypes.bool.isRequired
}
function mapStateToProps(state,ownProps) {
    return {
        username: state.user.username,
        logged: state.user.username ? true: false
    }
}
export default withRouter(connect(mapStateToProps)(Header))
