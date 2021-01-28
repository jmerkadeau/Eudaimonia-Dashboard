import React, { useState, useEffect} from 'react';
import '../App.css';
import { auth, database } from './../Firebase.js';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

function Histogram() {

  const [data, setData] = useState([]);


  const userInfo = auth.currentUser;
  const uid = userInfo.uid;
  var moodLog = [];
  var webLog = [];
  var moodLogAdj = [];
  var webLogAdj = [];

  const ms = () => {
      var moodObj = {};
      moodLog = [];
  
      const ref = database.ref('moods/'+uid+'/'+'1-26-2021');
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
          moodLog.push(moodObj);
        })
      })
      console.log(moodLog);
      // const x = moodLog[0].time;
      // console.log(x);
    }

    const ws = () => {
      var webObj = {};
      webLog = [];
      const ref = database.ref('web/'+uid+'/'+'1-26-2021');
      ref.on('value', (snapshot) => {
        snapshot.forEach((a) => {
          const domain = a.key;
          const ref2 = database.ref('web/'+uid+'/'+'1-26-2021'+'/'+domain);
          ref2.on('value', (snapshot2) => {
            snapshot2.forEach((b) => {
              const start = b.key;
              const end = b.val();
              webObj = {
                'start' : start,
                'end' : end,
                'domain' : domain
              }
              webLog.push(webObj);
            })
          })
        })
      })
      console.log(webLog);
    }

    // const ws = () => {
    //   var webObj = {};
    //   webLog = [];
    //   const ref = database.ref('web/'+uid+'/'+'1-26-2021');
    //   ref.once('value', (snapshot) => {
    //     snapshot.forEach((website) => {
    //       const domain = website.key;
    //       const dataa = snapshot.val();
    //       console.log(snapshot);
    //       console.log(dataa);
    //       console.log(dataa.entries());
    //       dataa.forEach((startTimes) => {
    //         const start = startTimes.key;
    //         const end = startTimes.val();
    //         webObj = {
    //           'start' : start,
    //           'end' : end,
    //           'domain' : domain
    //         }
    //         webLog.push(webObj);
    //       })
    //     })
    //   })
    //   console.log(webLog);
    // }

    const moodTimeToInt = () => {
      for (var i=0; i < moodLog.length; i++){
        const time = timeToInteger(moodLog[i].time);
        const mood1 = moodLog[i].mood1;
        const mood2 = moodLog[i].mood2;
        const mood = {
          'time' : time,
          'mood1' : mood1,
          'mood2' : mood2
        }
        moodLogAdj.push(mood);
      }
      console.log(moodLogAdj);
    }
  
    const webTimeToInt = () => {
      for (var i=0; i < webLog.length; i++){
        const start = timeToInteger(webLog[i].start);
        const end = timeToInteger(webLog[i].end);
        const domain = webLog[i].domain;
        const web = {
          'start' : start,
          'end' : end,
          'domain' : domain
        }
        webLogAdj.push(web);
      }
      console.log(webLogAdj);
    }
    
    const timeToInteger = (time) => {
      var t = time.split(':');
      for (var i=0; i<t.length; i++){
        t[i] = parseInt(t[i]);
      }
      const timeAsInt = ((t[0]*3600) + (t[1]*60) + t[2]);
      return (timeAsInt);
    }
  
    const moodGood = () => {
      var timeByDomain = []
      for (var i=0; i < moodLogAdj.length; i++){
        if (moodLogAdj[i].mood2 === 'Focused'){
          var time = moodLogAdj[i].time;
          console.log(time);
          //add conditional loop for if time < 3600
          const x = hourBeforeArray(time);
          console.log(x);
          const distinctDomains = [...new Set(x.map(x => x.domain))];
          console.log(distinctDomains);
          for (var j=0; j < distinctDomains.length; j++){
            var domTime = 0;
            for (var k=0; k < x.length; k++){
              if (x[k].domain === distinctDomains[j]){
                var timeDiff = (x[k].end - x[k].start);
                domTime += timeDiff;
              }
            }
            const domainTime = {
              'domain' : distinctDomains[j],
              'time' : domTime
            }
            console.log(domainTime);
            timeByDomain.push(domainTime);
          }
        }
      }
      console.log(timeByDomain);
      var sorted = timeByDomain.sort(compare);
      console.log(sorted);
      const dataFocused = [
          {
            name: sorted[0].domain, minutes: sorted[0].time,
          },
          {
            name: sorted[1].domain, minutes: sorted[1].time,
          },
          {
            name: sorted[2].domain, minutes: sorted[2].time,
          },
          {
            name: sorted[3].domain, minutes: sorted[3].time,
          },
          {
            name: sorted[4].domain, minutes: sorted[4].time,
          },
      ];
      setData([...dataFocused]);
    }
  
    function compare (a, b){
      const timeA = a.time;
      const timeB = b.time;
  
      let comparison = 0;
      if (timeA > timeB) {
        comparison = -1;
      }
      else if (timeA < timeB){
        comparison = 1;
      }
      return comparison;
  
    }
  
    const hourBeforeArray = (time) => {
      var hba = [];
      for (var i=0; i<webLogAdj.length; i++){
        var start = webLogAdj[i].start;
        //console.log(start);
        if (start > (time-3600) && start < time){
          console.log('found')
          hba.push(webLogAdj[i]);
          console.log(webLogAdj[i]);
        }
      }
      return (hba);
    }

  return(
      <div>
          <button onClick={ms}>
              1
          </button>
          <button onClick={moodTimeToInt}>
              2
          </button>
          <button onClick={ws}>
              3
          </button>
          <button onClick={webTimeToInt}>
              4
          </button>
          <button onClick={moodGood}>
              chart!
          </button>
          <h2>
              Mood: Focused
          </h2>

          

          <BarChart width={500} height={500} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="seconds" fill="#8884d8" />
          </BarChart>
      </div>
  )

}

export default Histogram;