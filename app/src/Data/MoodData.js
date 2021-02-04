import React from 'react';
import { auth, database } from './Firebase.js';
import { date } from './GetDate.js';

async function getMoodLog() {
  const uid = auth.currentUser.uid;
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

    const ref = database.ref('moods/'+uid+'/'+date);
    await ref.once('value', (snapshot) => {
        snapshot.forEach((a) => {
            const t = a.key;
            const time = timeToInteger(t);
            const m = a.val();
            const mood = m[Object.keys(m)[0]];

            moodObj = {
                'time' : time,
                'mood' : mood
            }
            moods.push(moodObj);
        })
    })
    return(moods);
}
export default getMoodLog;
