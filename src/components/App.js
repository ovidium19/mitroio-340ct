import React from 'react'
import { connect} from 'react-redux'
import {Route} from 'react-router-dom'
import PropTypes from  'prop-types'
import HomePage from './home/HomePage'
import Header from './common/Header'

class App extends React.Component {
    render() {
      return (
        <div className="container-fluid">
            <Header/>
            <Route exact path="/" component={HomePage}/>
        </div>
      )
    }
  }

App.propTypes = {
    match: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        loading: state.asyncInProgress > 0
    }
}

export default connect(mapStateToProps)(App);
