import React from 'react';
import './App.css';

import { auth } from './Firebase.js';

import { useAuthState } from 'react-firebase-hooks/auth';

import LandingPage from './Components/LandingPage.js';
import Home from './Components/Home.js';

//import Card from 'react-bootstrap/Card';



function App() {

  const [u] = useAuthState(auth);

  return (
    <div className="app">
      <section>
        {u ? <Home/> : <LandingPage/>}
      </section>  
    </div>
  );
}

export default App;
