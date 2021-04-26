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


async function getUserFromUID(uid) {
  const ref = database.ref(`users/${uid}`);
  var returnVal = {};
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      console.log(`user ${uid} found`);
      returnVal = snapshot.val();
    } else {
      console.log('username doesnt exist yet');
    }
  });
  return returnVal;
}

async function setUsername(username) {
  const uid = auth.currentUser.uid;
  const ref = database.ref(`users/${uid}`);
  ref.update({ 'username': username });

}

async function sendFriendRequest(friend_uid) {
  const uid = auth.currentUser.uid;
  const ref = database.ref(`friends/${uid}`);
  ref.update({ [friend_uid]: 1 });

  const ref1 = database.ref(`friends/${friend_uid}`);
  ref1.update({ [uid]: 2 });
}

async function acceptFriendRequest(friend_uid) {
  const uid = auth.currentUser.uid;
  // check if friend request recieved from person
  const ref = database.ref(`friends/${uid}`);
  var confirmRequestReceived = false;
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const val = snapshot.val();
      if (friend_uid in val & val[friend_uid] === 2) {
        // console.log("confirmed");
        confirmRequestReceived = true;
      }
    }
  });
  // console.log(confirmRequestReceived);
  // check if friend request sent from other person
  const ref1 = database.ref(`friends/${friend_uid}`);
  var confirmRequestSent = false;
  await ref1.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const val = snapshot.val();
      // console.log(val);
      if (uid in val & val[uid] === 1) {
        // console.log("confirmed");
        confirmRequestSent = true;
      }
    }
  });
  // console.log(confirmRequestSent);

  if (confirmRequestReceived & confirmRequestSent) {
    // change status to friends
    const ref = database.ref(`friends/${uid}`);
    await ref.update({ [friend_uid]: 3 });

    const ref1 = database.ref(`friends/${friend_uid}`);
    await ref1.update({ [uid]: 3 });
    return true;
  } else {
    // raise Error;
    return false;
  }


  // ref.update({ [friend_uid]: 1 });

  // const ref1 = database.ref(`friends/${friend_uid}`);
  // ref1.update({ [uid]: 2 });
}

async function getFriends() {
  const uid = auth.currentUser.uid;
  const ref = database.ref(`friends/${uid}`);
  var returnVal = {};
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      console.log("in friends table");
      // console.log(snapshot.val());
      returnVal = snapshot.val();
      // return (1);

    } else {
      console.log("not in friends table yet");
      // return {};
    }
  });
  return (returnVal);
}

export { getUsers, checkUsernameExists, setUsername, sendFriendRequest, getFriends, getUserFromUID, acceptFriendRequest };
