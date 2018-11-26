import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const AccountMenu = ({logged, username}) => (
    <React.Fragment>
        { !logged ?
            <ul className="navbar-nav ml-auto">
                <li className='nav-item '>
                    <NavLink to='/account/login' className='nav-link' activeClassName='active'>Log In</NavLink>
                </li>
                <li className='nav-item '>
                    <NavLink to='/account/register' className='nav-link' activeClassName='active'>Register</NavLink>
                </li>
            </ul>
        :
            <ul className="navbar-nav ml-auto">
                <li className='nav-item'>
                    <NavLink to={`/user/${username}/account`} className='nav-link' activeClassName='active'>Account</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to={`/user/${username}/signout`} className='nav-link' activeClassName='active'>Sign Out</NavLink>
                </li>
                <span className="navbar-text text-light small">
                    {`Welcome ${username}`}
                </span>
            </ul>

        }
    </React.Fragment>
)
AccountMenu.propTypes = {
    location: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    logged: PropTypes.bool.isRequired
}
export default AccountMenu
