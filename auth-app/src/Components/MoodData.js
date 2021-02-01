import React from 'react';
import '../App.css';
import { database } from '../Firebase.js';
import { date } from './GetDate.js';

async function getMoodLog(callback) {
  //Haven't updated for change of data structure yet
  //const userInfo = auth.currentUser;
  //const uid = userInfo.uid;
  const uid = 'BQJQmkLEsmSLFn6WF2JWWlXZzVo1';
  var moods = [];
  var moodObj = {};

  const timeToInteger = (time) => {
    var t = time.split(':');
    for (var i = 0; i < t.length; i++) {
      t[i] = parseInt(t[i]);
    }
    const timeAsInt = ((t[0] * 3600) + (t[1] * 60) + t[2]);
    return (timeAsInt);
  }

  const ref = database.ref('moods/' + uid + '/' + date);
  ref.once('value', (snapshot) => {
    var moods = [];
    snapshot.forEach((a) => {
      const t = a.key;
      const time = timeToInteger(t);
      const m = a.val();
      const mood = m[Object.keys(m)[0]];

      var moodObj = {
        'time': time,
        'mood': mood
      };
      moods.push(moodObj);
    });
    callback(moods);
  });
}

export default getMoodLog;
//exporting this for use in Data.js