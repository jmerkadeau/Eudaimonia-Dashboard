import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from './Profile.js';
import Data from './Data.js';
import Nav from './Nav.js';

function Home() {
    return(
        // Uses react-router-dom to allow the user to go between Profile and Data
        // User is automatically sent to Profile when logged in
        //
        // I don't think Router and Switch are both necessary but I haven't messed
        // around with them
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