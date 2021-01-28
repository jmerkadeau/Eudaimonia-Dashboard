import React from 'react';
import '../App.css';
import { auth, database } from './../Firebase.js';

// const userInfo = auth.currentUser;
// const uid = userInfo.uid;
// need to figure out why auth.currentUser is returning null
const uid = 'BQJQmkLEsmSLFn6WF2JWWlXZzVo1';
var webs = [];
var webObj = {};
const date = '1-26-2021';

const timeToInteger = (time) => {
    var t = time.split(':');
    for (var i=0; i<t.length; i++){
      t[i] = parseInt(t[i]);
    }
    const timeAsInt = ((t[0]*3600) + (t[1]*60) + t[2]);
    return (timeAsInt);
}

const ref = database.ref('web/'+uid+'/'+date);
ref.once('value', (snapshot) => {
    snapshot.forEach((a) => {
        const domain = a.key;
        //console.log(a.val());
        const ref2 = database.ref('web/'+uid+'/'+date+'/'+domain);
        // ref2.on('value', (snapshot2) => {
        //     snapshot2.forEach((b) => {
        //         const s = b.key;
        //         const start = timeToInteger(s);
        //         const e = b.val();
        //         const end = timeToInteger(e);
        //         webObj = {
        //             'start' : start,
        //             'end' : end,
        //             'domain' : domain
        //         }
        //     })
        //     webs.push(webObj);
        // })
    })
})
console.log(webs);

export var webLog = webs;
//exporting this for use in Data.js