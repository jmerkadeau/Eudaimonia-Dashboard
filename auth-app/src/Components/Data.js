import React from 'react';
import '../App.css';
import { auth, database } from '../Firebase.js';
// import Histogram from './Histogram.js';
// import BarGraph from './BarGraph.js';
import './Data.css';
//import { moodLog } from './MoodData.js';
import { webLog } from './WebData.js';
import { date } from './GetDate.js'
import { timeByDom } from './WebsiteByMood.js';
import WebByMoodGraph from './WebByMoodGraph.js';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


function Data() {

  const userInfo = auth.currentUser;
  const uid = userInfo.uid;

  // const today = new Date();
  // const month = today.getMonth() + 1;
  // const day = today.getDate();
  // const year = today.getFullYear();
  // const date = month+'-'+day+'-'+year;

  var mL = [];
  var wL = [];



  const moods = () => {
    var moods = [];
    var moodTimes = []; 
    mL = [];

    // moodObj = {
    //   mood1: '',
    //   mood2: '',
    //   time: ''
    // }
    const ref = database.ref('moods/'+uid+'/'+date);
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var logTime = childSnapshot.key;
        moodTimes.push(logTime);
        const ref2 = database.ref('moods/'+uid+'/'+date+'/'+logTime);
        ref2.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var mood = childSnapshot.val();

            moods.push(mood);
            mL.push(mood);
            mL.push(logTime);

          })
        })
      })
    })



    console.log(moodTimes);
    console.log(moods);
    console.log(mL);
  }

  const web = () => {
    var domains = [];
    var startTimes = [];
    var endTimes = [];
    wL = [];
    // var i = 0;


    const ref = database.ref('web/'+uid+'/'+date);
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var domain = childSnapshot.key;
        domains.push(domain);
        const ref2 = database.ref('web/'+uid+'/'+date+'/'+domain);
        ref2.once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            var start = childSnapshot.key;
            var end = childSnapshot.val();
            startTimes.push(start);
            endTimes.push(end);
            wL.push(domain);
            wL.push(start);
            wL.push(end);
          })
        })
      })
    })

    console.log(domains);
    console.log(startTimes);
    console.log(endTimes);
    console.log(wL);

  }

  // const integerToTime = (int) => {
  //   var hour = Math.floor(int/3600);
  //   var r1 = (int % 3600);
  //   var min = Math.floor(r1/60);
  //   var sec = (r1 % 60);
  //   var timeAsInt = [hour, min, sec];
  //   for (var i=0; i<timeAsInt.length; i++){
  //     timeAsInt[i] = timeAsInt[i].toString();
  //   }
  //   var time = timeAsInt.join(':');
  //   console.log(time);
  // }

  // const good = () => {
  //   for (var i=0; i < moodLog.length; i++){
  //     if (moodLog[i] === "Good"){
  //       const timeLogged = moodLog[i+1];
  //       console.log(timeLogged);
  //     }
  //   }
  // }


  // const moodCounter = () => {
  //   for (var i=0; i < mL.length; i++){
  //     if (mL[i] === "Awful"){
  //       awfuls++;
  //     }
  //     else if (mL[i] === "Bad"){
  //       bads++;
  //     }
  //     else if (mL[i] === "Fine"){
  //       fines++;
  //     }
  //     else if (mL[i] === "Good"){
  //       goods++;
  //     }
  //     else if (mL[i] === "Great"){
  //       greats++;
  //     }
  //   }
  //   console.log(awfuls, bads, fines, goods, greats);
  // }

  const showWeb = () => {
    console.log(webLog);
  }

  // const showMood = () => {
  //   console.log(moodLog);
  // }

  const anxious = () => {
    console.log(timeByDom);
  }





  return(
    <div className='data'>
        <h1>
            Data goes here
        </h1>
        <button onClick={moods}>
        moods
        </button>
        <button onClick={web}>
        web
        </button>
        {/* <button onClick={showMood}>
          show mood data
        </button> */}
        <button onClick={showWeb}>
          show web data
        </button>
        <button onClick={anxious}>
          anxious
        </button>
        <div>
          <WebByMoodGraph/>
        </div>
        {/* <div>
          <BarGraph/>
        </div> */}
    </div>
  )
}

export default Data;
