import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import Login from './components/Auth/Login'
import * as serviceWorker from './serviceWorker'

import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import store from './redux/store'
import { setUser, clearUser } from './redux/actions'

import 'semantic-ui-css/semantic.min.css'


class Root extends Component {
  componentDidMount() {
    const user = localStorage.getItem('user');
    
    if (user) {
      this.props.setUser(user)
      this.props.history.push('/')
    } else {
      this.props.history.push('/login')
      this.props.clearUser()
    }
  }
  
  render() {
    return(
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/requests" component={App} />
        <Redirect from="*" to="/requests" />
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser())
})

const RootWithAuth = withRouter(connect(null, mapDispatchToProps)(Root))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
  , 
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
