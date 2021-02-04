import React from 'react';
import { auth } from '../../Data/Firebase.js';
import { date } from '../../Data/GetDate.js';


function Profile() {
  // Collecting the user data from Google that we want to present on the profile page
  const userInfo = auth.currentUser;
  const name = userInfo.displayName;
  const email = userInfo.email;
  const uid = userInfo.uid;
  const photo = userInfo.photoURL;

  // Just checks if the user is signed in
  // Should always return user since the button is on a page
  // that is only accessible when signed in
  const checkUser = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user)
      }
      else {
        console.log("no user signed in")
      }
    });
  }

  // Allows the user to sign out and sends
  // them back to the landing page
  const signOut = () => {
    auth.signOut().then(() => {
      console.log('sign out succesful')
    }).catch((error) => {
      console.log(error);
    });
  }

  // Just prints some user info
  const hmm = () => {
    console.log(name + " " + email + " " + uid);
    console.log(date);
  }

  // Just displaying some user info on the page
  return (
    <div className="profile">
      <h1>
        Profile Page
      </h1>
      <div className='userButtons'>
        <button onClick={checkUser} >
          check user
        </button>
        <button onClick={signOut} >
          sign out
        </button>
        <button onClick={hmm} >
          hmm
        </button>
      </div>
      <div>
        <img src={photo} id='profilePic' alt='Profile' />
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