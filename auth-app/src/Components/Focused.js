import React from 'react';
import { moodLog } from './MoodData.js';
//import { webLog } from './WebData.js';

//haven't changed for new data structure yet
var timeByDomain = [];
for (var i=0; i < moodLogAdj.length; i++){
    if (moodLog[i].mood === 'Focused'){
      var time = moodLog[i].time;
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