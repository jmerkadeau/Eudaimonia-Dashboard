import React from 'react';
import { auth, database } from '../Firebase.js';
import { date } from './GetDate.js';

async function getWebLog() {
  const uid = auth.currentUser.uid;
  var webs = [];
  var webObj = {};

  const timeToInteger = (time) => {
    var t = time.split(':');
    for (var i = 0; i < t.length; i++) {
      t[i] = parseInt(t[i]);
    }
    const timeAsInt = ((t[0] * 3600) + (t[1] * 60) + t[2]);
    return (timeAsInt);
  }

  const ref = database.ref('web/' + uid + '/' + date);
  await ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
      const domain = a.key;
      var intervals = a.val();
      Object.keys(intervals).forEach(function (key) {
        const start = timeToInteger(key);
        const end = timeToInteger(intervals[key]);
        webObj = {
          'start': start,
          'end': end,
          'domain': domain
        };
        webs.push(webObj);
      });
  
    });
  });
  return(webs);
}

export default getWebLog;
