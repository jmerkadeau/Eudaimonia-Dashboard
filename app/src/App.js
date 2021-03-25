import React from 'react';
import { auth, database } from './Data/Firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useObject } from 'react-firebase-hooks/database';
import LandingPage from './Components/LandingPage/LandingPage.js';
import Home from './Components/Home/Home.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import Router from './Components/Dashboard/Router.js'
import Main from './Components/Dashboard/Main.js'
import SignInSide from './Components/LandingPage/NewLanding.js';
import Land from './Components/LandingPage/Land.js';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";
import './App.css';


function App() {
  const [user] = useAuthState(auth);

  const history = useHistory();
  const sendMain = () => history.push('/dashboard');

  //firebase's useAuthState hook gets the user's info

  //if user is signed in, sends to Home.js
  //if not, sends to LandingPage.js
  return (
    <div className="app">
      <section>
        {/* {user ? <Home /> : <LandingPage />} */}
        {user ? <Main user={user} /> : <Land />}
        {/* {user ? <Main path={sendMain} />: <Land />} */}

        {/* <BrowserRouter>
          <Switch>
            <Route path='/' render={() => (
              user? <Redirect to='/dashboard' /> : <Land />
              // !user? <Land /> : <Main/>
            )} />
          </Switch>
        </BrowserRouter> */}

      </section>
    </div>
    // <SignInSide></SignInSide>
  );
}

export default App;