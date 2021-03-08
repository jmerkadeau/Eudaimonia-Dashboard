import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Dashboard from './Dashboard.js'
import Mood from './Mood.js'
import Web from './WebPage.js'
import ScrollToTop from './ScrollToTop.js'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          {/* <Route exact path='/' component={ Main } /> */}
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/mood' component={ Mood } />
          <Route exact path='web' component={ Web } />
          {/* <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )