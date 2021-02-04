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
} else {
  firebase.app();
}

//Initializes the firebase app so that other files
//can access the user info and the data

export var auth = firebase.auth();
export var database = firebase.database();
export var provider = new firebase.auth.GoogleAuthProvider();