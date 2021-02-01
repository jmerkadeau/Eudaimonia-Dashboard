import React, { Component } from 'react';
import getMoodLog from './MoodData.js';
import { webLog } from './WebData.js';

// async function getMood(){
//     const moodLog = await getMoodLog().then(result => result.data);
//     return moodLog;
// }



const hourBeforeArray = (time) => {
    var hba = [];
    for (var i=0; i<webLog.length; i++){
      var start = webLog[i].start;
      var end = webLog[i].end;
      //console.log(start);
      if (start > (time-3600) && start < time){
        console.log('found')
        var timeDiff = end - start;
        const a = {
            'domain' : webLog[i].domain,
            'timeDiff' : timeDiff
        }
        hba.push(a);
        console.log(a);
      }
    }
    return (hba);
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

const anxious = async () => {
    const moodLog = await getMoodLog();
    //console.log(webLog)
    var timeByDomain = [];
    //console.log(Object.keys(moodLog));
    console.log(moodLog)
    //console.log(typeof(moodLog));
    //starting here

    // Object.keys(moodLog).forEach(function(key){
    //     console.log(key.moodLog[key]);
    // });
    for (let [key, value] of Object.entries(moodLog)){
        console.log(`${key}:${value}`);
    }
    for (var i = 0; i < moodLog.length; i++){
        // console.log(key);
        console.log(moodLog[i]);
        if (moodLog[i].mood === 'Anxious'){
            var time = moodLog[i].time;
            // add conditional loop for if time < 3600
            // x is the array of the web times for the hour leading up to the mood log
            const x  = hourBeforeArray(time)
            console.log(x);
            const distinctDomains = [...new Set(x.map(x => x.domain))];
            console.log(distinctDomains);
            for (var j = 0; j < distinctDomains.length; j++){
                var domTime = 0;
                for (var k = 0; k < x.length; k++){
                    if (x[k].domain === distinctDomains[j]){
                        console.log('works!!!')
                        domTime += x[k].timeDiff;
                    }
                }
                const domainTime = {
                    'domain' : distinctDomains[j],
                    'time' : domTime
                }
                timeByDomain.push(domainTime);
            }
        }
    }
    const topFive = timeByDomain.sort(compare);
    const anxiousData = [
        {name: topFive[0].domain, seconds: topFive[0].time},
        {name: topFive[1].domain, seconds: topFive[1].time},
        {name: topFive[2].domain, seconds: topFive[2].time},
        {name: topFive[3].domain, seconds: topFive[3].time},
        {name: topFive[4].domain, seconds: topFive[4].time},        
    ]
    console.log(anxiousData);
    return(anxiousData);



    //ending here
    // const anxiousData = [
    //     {name: timeByDomain[0].domain, seconds: timeByDomain[0].time},
    //     {name: timeByDomain[1].domain, seconds: timeByDomain[1].time},
    //     {name: timeByDomain[2].domain, seconds: timeByDomain[2].time},
    //     {name: timeByDomain[3].domain, seconds: timeByDomain[3].time},
    //     {name: timeByDomain[4].domain, seconds: timeByDomain[4].time},        
    // ]
}
// export default tim;

// // console.log(timeByDomain);
export default anxious;