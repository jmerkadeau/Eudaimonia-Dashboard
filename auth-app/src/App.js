import React from 'react';
import './App.css';


import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import CanvasJSReact from './canvasjs.react';
import { useAuthState } from 'react-firebase-hooks/auth';
import GSI from './GSI.png';

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

//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function App() {

  const [u] = useAuthState(auth);

  return (
    <div className="app">
      <section>
        {u ? <Profile /> : <SignInPage/>}
      </section>  
    </div>
  );
}



function SignInPage(){
  
  const googleSignIn = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
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

      <div id="buttonContainer">
        <img src={GSI} onClick={googleSignIn} id="googleButton" alt="Sign in with Google"/>
      </div>

    </div>
  );
}



function Profile(){
  const userInfo = auth.currentUser;
  const name = userInfo.displayName;
  const email = userInfo.email;
  const uid = userInfo.uid;

  

  const checkUser = () => {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user)
    } 
    else {
      console.log("no user signed in")
    }
    });
  }

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('sign out succesful')
    }).catch((error) => {
      console.log(error);
    });
  }

  const hmm = () => {
    console.log(name+" "+email+" "+uid);
  }

  const moods = () => {
    var moods = [];
    var moodTimes = []; 
    var moodLog = [];


    const ref = database.ref('moods/xLn8CQzbMveVTyiiRFO5e681lKH2/1-12-2021');
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var logTime = childSnapshot.key;
        moodTimes.push(logTime);
        const ref2 = database.ref('moods/xLn8CQzbMveVTyiiRFO5e681lKH2/1-12-2021/' + logTime);
        ref2.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var mood = childSnapshot.val();
            moods.push(mood);
            moodLog.push(mood);
            moodLog.push(logTime);
          })
        })
      })
    })

    console.log(moodTimes);
    console.log(moods);
    console.log(moodLog);
  }

  const web = () => {
    var startTimes = [];
    var endTimes = [];
    var domains = [];
    var webLog = [];
    var i = 0;


    const ref = database.ref('web/xLn8CQzbMveVTyiiRFO5e681lKH2/1-12-2021');
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var startTime = childSnapshot.key;
        startTimes.push(startTime);
        const ref2 = database.ref('web/xLn8CQzbMveVTyiiRFO5e681lKH2/1-12-2021/' + startTime);
        ref2.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var data = childSnapshot.val();
            if (i % 2 !== 0){
              endTimes.push(data);
              webLog.push(startTime);
              webLog.push(data);
              i++;
            }
            else{
              domains.push(data);
              webLog.push(data);
              i++;
            }
          })
        })
      })
    })
    console.log(startTimes);
    console.log(endTimes);
    console.log(domains);
    console.log(webLog);
  }

  const pie1 = {
    title: {
      text: "Mood - Awful"
    },
    data: [{
      type: 'pie',
      showInLegend: true,
      legendText: '{indexLabel}',
      dataPoints: [
        { y: 4181563, indexLabel: "Website 1" },
        { y: 2175498, indexLabel: "Website 2" },
        { y: 3125844, indexLabel: "Website 3" },
        { y: 1176121, indexLabel: "Website 4"},
        { y: 1727161, indexLabel: "Website 5"},
        { y: 4303364, indexLabel: "Website 6"},
        { y: 1717786, indexLabel: "Website 7"}
      ]
    }]
  }



  return(
    <div className="profile">
      <button onClick={checkUser} >
        check user
      </button>
      <button onClick={signOut} >
        sign out
      </button>
      <button onClick={hmm} >
        hmm
      </button>
      <button onClick={moods}>
        moods
      </button>
      <button onClick={web}>
        web
      </button>
      <div>
        <CanvasJSChart options={pie1} />
      </div>

    </div>
  )

}

export default App;
