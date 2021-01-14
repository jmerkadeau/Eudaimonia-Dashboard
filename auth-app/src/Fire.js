import React from "react";

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
}
else {
    firebase.app();
}

export var auth = firebase.auth();
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();

export function GSI(){
    var uid = "";
    var name = "";
    var email = "";   
    return(
        firebase.auth().signInWithPopup(provider).then((result) => {
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            uid = user.uid;
            name = user.displayName;
            email = user.email;

            console.log(token);
            console.log(user);

            console.log(uid);
            console.log(name);
            console.log(email);

            database.ref('users/' + uid).set({
                name: name,
                username: uid,
                email: email
            })

            //send to profile page here
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

            console.log(errorCode);
            console.log(errorMessage);
        })        
    ) 
}

// const Fire = () => {
//     var uid = "";
//     var name = "";
//     var email = "";
//     return(
//         function GoogleSignIn(){
//             firebase.auth().signInWithPopup(provider).then((result) => {
//                 var credential = result.credential;
//                 var token = credential.accessToken;
//                 var user = result.user;
//                 uid = user.uid;
//                 name = user.displayName;
//                 email = user.email;

//                 console.log(token);
//                 console.log(user);

//                 console.log(uid);
//                 console.log(name);
//                 console.log(email);

//                 database.ref('users/' + uid).set({
//                     name: name,
//                     username: uid,
//                     email: email
//                 })

//                 //send to profile page here
//             }).catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 var email = error.email;
//                 var credential = error.credential;

//                 console.log(errorCode);
//                 console.log(errorMessage);
//             });
//         }

//     )
// }
