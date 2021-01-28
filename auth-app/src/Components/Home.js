import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from './Profile.js';
import Data from './Data.js';
import Nav from './Nav.js';

function Home() {
    return(
        <div className='home'>
            <Router>
                <Nav />
                <Switch>
                    <Route path='/' exact component={() => <Profile />} />
                    <Route path='/data' exact component={() => <Data />} />
                </Switch>
            </Router>

        </div>
    )
}

export default Home;