import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
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
                <ul className="navbar-nav">
                    <li className={`nav-item ${location.pathname == '/' ? 'active' : ''}`}>
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                    </li>
                    <li className={`nav-item ${location.pathname == '/courses' ? 'active' : ''}`}>
                        <NavLink to='/courses' className='nav-link'>Courses</NavLink>
                    </li>
                </ul>
                {
                    !logged ?
                    <ul className="navbar-nav ml-auto">
                        <li className='nav-item '>
                            <NavLink to='/account/login' className='nav-link' activeClassName='active'>Log In</NavLink>
                        </li>
                        <li className='nav-item '>
                            <a className="nav-link" href="#">Register</a>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">

                        <li className='nav-item'>
                            <a className="nav-link" href="#">Account</a>
                        </li>
                        <li className='nav-item'>
                        <a className="nav-link" href="#">Sign Out</a>
                        </li>
                        <span className="navbar-text text-light small">
                            {`Welcome ${username}`}
                        </span>
                    </ul>

                }
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
