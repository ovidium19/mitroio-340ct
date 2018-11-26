import React from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import configureStore from './store/configureStore'
import App from './components/App'
import Test from './components/common/Test'

let store = configureStore()

render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
export default {}
