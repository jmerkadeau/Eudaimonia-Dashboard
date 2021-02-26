import React from 'react';
import { auth, database, provider } from '../../Data/Firebase.js';
import { useHistory } from "react-router-dom";
import GSI from '../../GSI.png';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Box, Container, Typography, Avatar, Grid, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4887ED",
      light: "#70A1F1",
    },
    secondary: {
        main: '#FFFFFF'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  extensionButton: {
      marginRight: theme.spacing(5),
      marginTop: theme.spacing(1.5)
  },
}));
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

  const classes = useStyles();
  return(
    <ThemeProvider theme={theme}>
      <Container item>
        <Button variant='text' color='primary' onClick={sendToLand} className={classes.googleButton} startIcon={<img src={GSI} style={{maxWidth: '75%', maxHeight: '75%', minWidth: '75%', minHeight: '75%'}}></img>}>
        </Button>
      </Container>
    </ThemeProvider>
  );
}


export default SignIn;