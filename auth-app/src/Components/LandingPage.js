import React from 'react';
import './LandingPage.css';
import GSI from './../GSI.png';
import { auth, database, provider } from '../Firebase.js';

//Sign in button is imported from GSI.png
//and style is imported from LandingPage.css

function LandingPage(){
  //user is sent here if not signed in
  
  //this function is Firebase's default google sign in method
  //opens a pop-up to sign in via Google and then connects with Firebase
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
  