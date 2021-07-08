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

async function getAllMoodsByTime() {
  const uid = auth.currentUser.uid;
  let allMoods = [];
  const ref = database.ref('moods/' + uid);
  await ref.once('value', (snapshot) => {
    snapshot.forEach((snap) => {
      const moodsPerDay = snap.val();
      for (var key in moodsPerDay) {
        allMoods.push({
          'time': key,
          'mood': moodsPerDay[key].mood,
        })
        // console.log(key, moodsPerDay[key].mood)
      }
      // console.log(snap.key);
      // console.log(snap.val());
    })
  })
  // console.log(allMoods);


  let moodCounters = [0, 0, 0, 0, 0, 0, 0, 0]

  for (var i = 0; i < allMoods.length; i++){
    const cH = allMoods[i].time.substring(0, 2);
    
    if (cH == '00' || cH == '01' || cH == '02'){
      moodCounters[0]++;
    }
    else if (cH == '03' || cH == '04' || cH == '05'){
      moodCounters[1]++;
    }
    else if (cH == '06' || cH == '07' || cH == '08'){
      moodCounters[2]++;
    }
    else if (cH == '09' || cH == '10' || cH == '11'){
      moodCounters[3]++;
    }
    else if (cH == '12' || cH == '13' || cH == '14'){
      moodCounters[4]++;
    }
    else if (cH == '15' || cH == '16' || cH == '17'){
      moodCounters[5]++;
    }
    else if (cH == '18' || cH == '19' || cH == '20'){
      moodCounters[6]++;
    }
    else if (cH == '21' || cH == '22' || cH == '23'){
      moodCounters[7]++;
    }
  }

  let allMoodsByTime = [
    {'id': 0, 'time': '12-3 AM', 'moodCount': moodCounters[0]},
    {'id': 1, 'time': '3-6 AM', 'moodCount': moodCounters[1]},
    {'id': 2, 'time': '6-9 AM', 'moodCount': moodCounters[2]},
    {'id': 3, 'time': '9-12 AM', 'moodCount': moodCounters[3]},
    {'id': 4, 'time': '12-3 PM', 'moodCount': moodCounters[4]},
    {'id': 5, 'time': '3-6 PM', 'moodCount': moodCounters[5]},
    {'id': 6, 'time': '6-9 PM', 'moodCount': moodCounters[6]},
    {'id': 7, 'time': '9-12 PM', 'moodCount': moodCounters[7]},
  ]
  console.log(allMoodsByTime)

  return (allMoodsByTime)
}

export { getAllTimeWebByMood, getAllTimeMoodByWeb, getAllTimeMood, getAllTimeWeb, getAllMoodsByTime };