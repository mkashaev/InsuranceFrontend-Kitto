import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import ListOfPendingClaims from './ListOfClaims/ListOfPendingClaims'
import ListOfRequests from './ListOfApplications/ListOfRequests'
import ListOfHistoryApps from './ListOfApplications/ListOfHistoryApps'


import SidePanel from './SidePanel/SidePanel'
import './App.css'

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <BrowserRouter>
          <SidePanel>
            <Switch>
              <Route path="/claims"   render={()=><ListOfPendingClaims status="PENDING%2CACCEPTED" action="CLAIMING" type="claims"/>}/>
              <Route path="/requests" render={()=><ListOfRequests status="PENDING" action="REQUESTS" type="requests"/>}/>
              <Route path="/history"  render={()=><ListOfHistoryApps status="REJECTED,ACCEPTED" action="HISTORY" type="requests"/>}/>
              <Redirect from="*" to="/requests"/>
            </Switch>
          </SidePanel>
        </BrowserRouter>
      // </Provider>
    );
  }
}

export default App
