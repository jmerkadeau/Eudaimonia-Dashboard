import React from 'react';
import { auth, database, provider } from '../../Data/Firebase.js';
import { useHistory } from "react-router-dom";
import GSI from '../../GSI.png';

function SignIn() {
  let history = useHistory();

  function sendToLand() {
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
    history.push('/dashboard');
  }

  return(
    <div>
        <img src={GSI} onClick={sendToLand} id="googleButton" alt="Sign in with Google" />
    </div>
  );
}


export default SignIn;