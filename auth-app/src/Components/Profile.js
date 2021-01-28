import React from 'react';
import '../App.css';

import { auth } from './../Firebase.js';
import { date } from './GetDate.js';


function Profile(){
    const userInfo = auth.currentUser;
    const name = userInfo.displayName;
    const email = userInfo.email;
    const uid = userInfo.uid;
    const photo = userInfo.photoURL;

    // const today = new Date();
    // const month = today.getMonth() + 1;
    // const day = today.getDate();
    // const year = today.getFullYear();
    // const date = month+'-'+day+'-'+year;
  
    
  
    const checkUser = () => {
      auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
      } 
      else {
        console.log("no user signed in")
      }
      });
    }
  
    const signOut = () => {
      auth.signOut().then(() => {
        console.log('sign out succesful')
      }).catch((error) => {
        console.log(error);
      });
    }
  
    const hmm = () => {
      console.log(name+" "+email+" "+uid);
      console.log(date);
    }

    return(
      <div className="profile">
        <h1>
            Profile Page
        </h1>

        <button onClick={checkUser} >
            check user
        </button>

        <button onClick={signOut} >
            sign out
        </button>

        <button onClick={hmm} >
            hmm
        </button>
        <div>
            <img src={photo} id='profilePic' alt='Profile'/>
            <span>
                <h3>
                    {name}
                </h3>
                <h4>
                    {email}
                </h4>
            </span>
        </div>
      </div>
    )
}

export default Profile;