import React from 'react';
import { auth } from './Data/Firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import Main from './Components/Dashboard/Main.js';
import Land from './Components/LandingPage/Land.js';
import { useHistory } from "react-router-dom";
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
        {user ? <Main user={user} /> : <Land />}
      </section>
    </div>
  );
}

export default App;