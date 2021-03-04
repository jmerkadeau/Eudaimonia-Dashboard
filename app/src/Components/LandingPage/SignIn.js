import React from 'react';
import { auth, database, provider } from '../../Data/Firebase.js';
import { useHistory } from "react-router-dom";
import GSI from '../../GSI.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Box, Container, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import GoogleButton from 'react-google-button';

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
    history.push('/');
  }

  return(
        <GoogleButton type='light' onClick={sendToLand}/>
  );
}


export default SignIn;