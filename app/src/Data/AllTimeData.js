import React from 'react';
import { auth, database } from './Firebase.js';
import { date } from './GetDate.js';

async function getAllTimeWebByMood() {
  const uid = auth.currentUser.uid;
  var webByMoodAllTime = {};
  const ref = database.ref('webByMood/' + uid);
  await ref.once('value', (snapshot) => {
    // console.log("getAllTimeWebByMood");
    snapshot.forEach((snap) => {
      // console.log(snap.key);
      // console.log(snap.val());
      webByMoodAllTime[snap.key] = snap.val();
    });
  });
  return (webByMoodAllTime);
}

async function getAllTimeMoodByWeb() {
  const uid = auth.currentUser.uid;
  var moodByWebAllTime = {};
  const ref = database.ref('moodByWeb/' + uid);
  await ref.once('value', (snapshot) => {
    // console.log("getAllTimeMoodByWeb");
    snapshot.forEach((snap) => {
      // console.log(snap.key);
      // console.log(snap.val());
      moodByWebAllTime[snap.key] = snap.val();
    });
  });
  return (moodByWebAllTime);
}

async function getAllTimeMood() {
  const uid = auth.currentUser.uid;
  var moodAllTime = {};
  const ref = database.ref('totalMoodCount/' + uid);
  await ref.once('value', (snapshot) => {
    // console.log("allTimeMoodCount");
    snapshot.forEach((snap) => {
      // console.log(snap.key);
      // console.log(snap.val());
      moodAllTime[snap.key] = snap.val();
    });
  });
  // console.log(moodAllTime);
  return (moodAllTime);
}
async function getAllTimeWeb() {
  const uid = auth.currentUser.uid;
  var webAllTime = {};
  const ref = database.ref('totalWebTime/' + uid);
  await ref.once('value', (snapshot) => {
    // console.log("totalWebTime");
    snapshot.forEach((snap) => {
      // console.log(snap.key);
      // console.log(snap.val());
      webAllTime[snap.key] = snap.val();
    });
  });
  // console.log(webAllTime);
  return (webAllTime);
}

export { getAllTimeWebByMood, getAllTimeMoodByWeb, getAllTimeMood, getAllTimeWeb };