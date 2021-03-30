import React from 'react';
import NewLanding from './NewLanding.js';
import GetStarted from './GetStarted.js';

import Policy2 from './Policy2.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



export default function Land() {

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={() => <NewLanding />} />
          <Route path='/tutorial' exact component={() => <GetStarted />} />
          <Route path='/privacy' exact component={() => <Policy2 />} />
        </Switch>
      </Router>

    </div>
  );
}