import React from 'react';
import { auth, database } from './Firebase.js';

const capitalize = (s) => {
  const words = s.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return (words.join(" "));
};
async function getUsers(username) {
  var users = [];
  const uid = auth.currentUser.uid;
  // term = capitalize(term);
  // console.log(term);
  const ref = database.ref('users');
  await ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
      console.log(a.val());
      let v = a.val();
      if ('username' in v && v.username.includes(username)) {
        console.log(v);
        users.push(v);
      }
    });
  });
  return users;
}


async function checkUsernameExists(username) {
  const ref = database.ref('users').orderByChild("username").equalTo(username);
  var returnValue = false;
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      console.log('username already exists');
      returnValue = true;
    } else {
      console.log('username doesnt exist yet');
      returnValue = false;
    }
  });
  return returnValue;
}

async function setUsername(username) {
  const uid = auth.currentUser.uid;
  const ref = database.ref(`users/${uid}`);
  ref.update({ 'username': username });

}



export { getUsers, checkUsernameExists, setUsername };
