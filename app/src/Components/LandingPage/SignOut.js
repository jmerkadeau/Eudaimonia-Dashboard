import React from 'react';
import { auth } from '../../Data/Firebase.js';

const SignOut = () => {
    auth.signOut().then(() => {
      console.log('sign out succesful')
    }).catch((error) => {
      console.log(error);
    });
}

export default SignOut;