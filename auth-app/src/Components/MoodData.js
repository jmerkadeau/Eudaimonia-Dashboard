import React from 'react';
import '../App.css';
import { database } from './../Firebase.js';
import { date } from './GetDate.js';

//Haven't updated for change of data structure yet
//const userInfo = auth.currentUser;
//const uid = userInfo.uid;
const uid = 'BQJQmkLEsmSLFn6WF2JWWlXZzVo1';
var moods = [];
var moodObj = {};

const timeToInteger = (time) => {
    var t = time.split(':');
    for (var i=0; i<t.length; i++){
      t[i] = parseInt(t[i]);
    }
    const timeAsInt = ((t[0]*3600) + (t[1]*60) + t[2]);
    return (timeAsInt);
}

const ref = database.ref('moods/'+uid+'/'+date);
ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
        const t = a.key;
        const time = timeToInteger(t);
        const m = a.val();
        const mood1 = m[Object.keys(m)[0]];
        const mood2 = m[Object.keys(m)[1]];
        moodObj = {
            'time' : time,
            'mood1' : mood1,
            'mood2' : mood2            
        }
        moods.push(moodObj);
    })
})
console.log(moods);

export var moodLog = moods;
//exporting this for use in Data.js