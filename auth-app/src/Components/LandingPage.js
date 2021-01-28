import React from 'react';
import '../App.css';
import GSI from './../GSI.png';


import { auth, database, provider } from './../Firebase.js';

function LandingPage(){
  
    const googleSignIn = () => {
      auth.signInWithPopup(provider).then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        
        console.log(token);
        console.log(user);
  
        database.ref('users/' + user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    }
  
    return(
      <div className="signInPage">
        <h1>
          Eudaimonia
        </h1>
        <div id='card'>
          <img src={GSI} onClick={googleSignIn} id="googleButton" alt="Sign in with Google"/>
        </div>
  
      </div>
    );
  }

  export default LandingPage;
  