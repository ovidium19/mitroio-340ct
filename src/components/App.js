import React from 'react'
import { connect} from 'react-redux'
import {Route} from 'react-router-dom'
import PropTypes from  'prop-types'
import HomePage from './home/HomePage'

class App extends React.Component {
    render() {
      return (
        <div className="container-fluid">
          <Route exact path="/" component={HomePage}/>
        </div>
      )
    }
  }

App.propTypes = {
    match: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return state
}

export default connect(mapStateToProps)(App);
