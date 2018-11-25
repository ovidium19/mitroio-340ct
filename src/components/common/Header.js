import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
const Header = ({match, username, logged}) => {
    console.log(match)
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><img className='img-brand' src='/brand.png'/> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navLinks" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navLinks">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
            </div>
    </nav>
)}
Header.propTypes = {
    match: PropTypes.object.isRequired,
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
