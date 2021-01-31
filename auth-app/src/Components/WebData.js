import React from 'react';
import '../App.css';
import { auth, database } from '../Firebase.js';

// const userInfo = auth.currentUser;
// const uid = userInfo.uid;
// need to figure out why auth.currentUser is returning null
const uid = 'BQJQmkLEsmSLFn6WF2JWWlXZzVo1';
var webs = [];
var webObj = {};
const date = '1-31-2021';

const timeToInteger = (time) => {
  var t = time.split(':');
  for (var i = 0; i < t.length; i++) {
    t[i] = parseInt(t[i]);
  }
  const timeAsInt = ((t[0] * 3600) + (t[1] * 60) + t[2]);
  return (timeAsInt);
}

const ref = database.ref('web/' + uid + '/' + date);
ref.once('value', (snapshot) => {
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
  // console.log(webs);
});

export var webLog = webs;
//exporting this for use in Data.js