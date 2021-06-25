import React from 'react';
import { auth, database } from './Firebase.js';
import { getGraphableWebByMoodData } from './WebsiteByMood.js';
import { date } from './GetDate.js';
import { ViewArray } from '@material-ui/icons';


const capitalize = (s) => {
  const words = s.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return (words.join(" "));
};
const timeToInteger = (time) => {
  var t = time.split(':');
  for (var i = 0; i < t.length; i++) {
    t[i] = parseInt(t[i]);
  }
  const timeAsInt = ((t[0] * 3600) + (t[1] * 60) + t[2]);
  return (timeAsInt);
};

function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    "h": hours,
    "m": minutes,
    "s": seconds
  };
  return obj;
}


async function getUsers(username) {
  var users = [];
  const uid = auth.currentUser.uid;
  // term = capitalize(term);
  // console.log(term);
  const ref = database.ref('users');
  await ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
      // console.log(a.val());
      let v = a.val();
      if ('username' in v && v.username.toLowerCase().includes(username.toLowerCase())) {
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


async function getFriendMoodData(uid) {
  const ref = database.ref(`moods/${uid}/`);
  var returnVal = {};
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      // console.log(`friend ${uid} found`);
      returnVal = snapshot.val();
    } else {
      // console.log('friend mood data doesnt exist yet');
    }
  });
  return returnVal;
}

function calculateTotalWebTime(webData) {
  var totalWebTime = 0;
  console.log(webData);
  for (const url in webData) {
    const intervals = webData[url];
    for (const startTime in intervals) {
      const endTime = intervals[startTime];
      // console.log(startTime, endTime);
      var interval = timeToInteger(endTime) - timeToInteger(startTime);
      if (interval === 0) {
        interval = 1;
      }
      totalWebTime += interval;
      // console.log(interval);
    }
  }
  // console.log(totalWebTime);
  return totalWebTime;
}
async function getFriendWebTime(uid) {
  const ref = database.ref(`web/${uid}/`);
  var returnVal = {
    "h": 0,
    "m": 0,
    "s": 0
  };
  await ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      // console.log(`friend ${uid} found`);
      var webData = snapshot.val();
      if (date in webData) {
        let todayData = webData[date];
        // console.log(todayData);
        const totalWebTimeSec = calculateTotalWebTime(todayData);
        const totalWebTime = secondsToTime(totalWebTimeSec);
        // console.log(totalWebTimeSec);

        // console.log(totalWebTime);
        returnVal = totalWebTime;
        //   // return todayData
      }
      // console.log(returnVal);

    } else {
      // console.log('friend mood data doesnt exist yet');
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

export {
  getUsers, checkUsernameExists, setUsername, sendFriendRequest,
  getFriends, getUserFromUID, acceptFriendRequest, getFriendMoodData,
  getFriendWebTime
};
