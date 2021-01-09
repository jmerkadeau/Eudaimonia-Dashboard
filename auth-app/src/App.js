import React, { Component } from 'react';
import './App.css';
// import {auth, database} from './firebase.js';
import Google from "./Google";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


var firebaseConfig = {
    apiKey: "AIzaSyBj7fmZRv_SCFXClGvWKN_QFr-_vxv_42w",
    authDomain: "user-auth-development.firebaseapp.com",
    databaseURL: "https://user-auth-development-default-rtdb.firebaseio.com",
    projectId: "user-auth-development",
    storageBucket: "user-auth-development.appspot.com",
    messagingSenderId: "496590033273",
    appId: "1:496590033273:web:c2f3ca11a7ddf2c6fa9fa8"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}

var auth = firebase.auth();
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      uid: "",
      name: "",
      email: ""
    }

    this.googleSignIn = this.googleSignIn.bind(this);
  }


  googleSignIn(event) {
    const self = this;
    console.log(event.target);
    console.log(auth)
    firebase.auth().signInWithPopup(provider).then((result) => {
      var credential = result.credential;
      console.log(credential);
      var token = credential.accessToken;
      console.log(token);
      var user = result.user;
      console.log(user);
      self.setState({
        uid: user.uid,
        name: user.displayName,
        email: user.email
      });
      console.log(self.state.uid);
      console.log(self.state.name);
      console.log(self.state.email);      
      database.ref('users/' + self.state.uid).set({
        name: self.state.name,
        username: self.state.uid,
        email: self.state.email
      })
    }).catch((error) => {
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      console.log(email);
      var credential = error.credential;
      console.log(credential);
    });







  }

  render() {
    return(
      <div className="fullPage">
        <Google googleSignIn={this.googleSignIn}/>
      </div>

    );
  }

}




// function App() {
//   return (
//     <div className="fullPage">
//       <Google/>
//     </div>
//   );
// }

export default App;
