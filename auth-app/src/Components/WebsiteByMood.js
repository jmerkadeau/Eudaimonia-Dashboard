import React, { Component } from 'react';
import getMoodLog from './MoodData.js';
import { webLog } from './WebData.js';

const hourBeforeArray = (time) => {
  var hba = [];
  for (var i = 0; i < webLog.length; i++) {
    var start = webLog[i].start;
    var end = webLog[i].end;
    //console.log(start);
    if (start > (time - 3600) && start < time) {
      var timeDiff = end - start;
      const a = {
        'domain': webLog[i].domain,
        'timeDiff': timeDiff
      }
      hba.push(a);
    }
  }
  return (hba);
};
function compare(a, b) {
  const timeA = a.time;
  const timeB = b.time;

  let comparison = 0;
  if (timeA > timeB) {
    comparison = -1;
  }
  else if (timeA < timeB) {
    comparison = 1;
  }
  return comparison;
}

var getAnxious = async () => {
    var timeByDomain = [];
    const moodLog = await getMoodLog();
    for (var i = 0; i < moodLog.length; i++){
        if (moodLog[i].mood === 'Anxious'){
            var time = moodLog[i].time;
            // add conditional loop for if time < 3600
            // x is the array of the web times for the hour leading up to the mood log
            const x  = hourBeforeArray(time)
            const distinctDomains = [...new Set(x.map(x => x.domain))];
            for (var j = 0; j < distinctDomains.length; j++){
                var domTime = 0;
                for (var k = 0; k < x.length; k++){
                    if (x[k].domain === distinctDomains[j]){
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
    console.log(topFive);
    var anxiousData = [];
    if (topFive === undefined || topFive.length == 0){
        anxiousData = [
            {name: 'none', seconds: 0}
        ];
    }
    else{
        anxiousData = [
            {name: topFive[0].domain, seconds: topFive[0].time},
            {name: topFive[1].domain, seconds: topFive[1].time},
            {name: topFive[2].domain, seconds: topFive[2].time},
            {name: topFive[3].domain, seconds: topFive[3].time},
            {name: topFive[4].domain, seconds: topFive[4].time},        
        ]
    }
    console.log(anxiousData);
    return(anxiousData);
};
var getConfident = async () => {
    var timeByDomain = [];
    const moodLog = await getMoodLog();
    for (var i = 0; i < moodLog.length; i++){
        if (moodLog[i].mood === 'Confident'){
            var time = moodLog[i].time;
            // add conditional loop for if time < 3600
            // x is the array of the web times for the hour leading up to the mood log
            const x  = hourBeforeArray(time)
            const distinctDomains = [...new Set(x.map(x => x.domain))];
            for (var j = 0; j < distinctDomains.length; j++){
                var domTime = 0;
                for (var k = 0; k < x.length; k++){
                    if (x[k].domain === distinctDomains[j]){
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
    console.log(topFive);
    var confidentData = [];
    if (topFive === undefined || topFive.length == 0){
        confidentData = [
            {name: 'none', seconds: 0}
        ];
    }
    else{
        confidentData = [
            {name: topFive[0].domain, seconds: topFive[0].time},
            {name: topFive[1].domain, seconds: topFive[1].time},
            {name: topFive[2].domain, seconds: topFive[2].time},
            {name: topFive[3].domain, seconds: topFive[3].time},
            {name: topFive[4].domain, seconds: topFive[4].time},        
        ]
    }
    console.log(confidentData);
    return(confidentData);
};
var getSad = async () => {
    var timeByDomain = [];
    const moodLog = await getMoodLog();
    for (var i = 0; i < moodLog.length; i++){
        if (moodLog[i].mood === 'Sad'){
            var time = moodLog[i].time;
            // add conditional loop for if time < 3600
            // x is the array of the web times for the hour leading up to the mood log
            const x  = hourBeforeArray(time)
            const distinctDomains = [...new Set(x.map(x => x.domain))];
            for (var j = 0; j < distinctDomains.length; j++){
                var domTime = 0;
                for (var k = 0; k < x.length; k++){
                    if (x[k].domain === distinctDomains[j]){
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
    console.log(topFive);
    var sadData = [];
    if (topFive === undefined || topFive.length == 0){
        sadData = [
            {name: 'none', seconds: 0}
        ];
    }
    else{
        sadData = [
            {name: topFive[0].domain, seconds: topFive[0].time},
            {name: topFive[1].domain, seconds: topFive[1].time},
            {name: topFive[2].domain, seconds: topFive[2].time},
            {name: topFive[3].domain, seconds: topFive[3].time},
            {name: topFive[4].domain, seconds: topFive[4].time},        
        ]
    }
    console.log(sadData);
    return(sadData);
};
var getHappy = async () => {
    var timeByDomain = [];
    const moodLog = await getMoodLog();
    for (var i = 0; i < moodLog.length; i++){
        if (moodLog[i].mood === 'Happy'){
            var time = moodLog[i].time;
            // add conditional loop for if time < 3600
            // x is the array of the web times for the hour leading up to the mood log
            const x  = hourBeforeArray(time)
            const distinctDomains = [...new Set(x.map(x => x.domain))];
            for (var j = 0; j < distinctDomains.length; j++){
                var domTime = 0;
                for (var k = 0; k < x.length; k++){
                    if (x[k].domain === distinctDomains[j]){
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
    console.log(topFive);
    var happyData = [];
    if (topFive === undefined || topFive.length == 0){
        happyData = [
            {name: 'none', seconds: 0}
        ];
    }
    else{
        happyData = [
            {name: topFive[0].domain, seconds: topFive[0].time},
            {name: topFive[1].domain, seconds: topFive[1].time},
            {name: topFive[2].domain, seconds: topFive[2].time},
            {name: topFive[3].domain, seconds: topFive[3].time},
            {name: topFive[4].domain, seconds: topFive[4].time},        
        ]
    }
    console.log(happyData);
    return(happyData);
};

// function anxiousRetrieved(moodLog) {
//   // var timeByDomain = [];
//   // console.log(typeof (moodLog));
//   // console.log(`here ${moodLog}`);
//   // console.log(moodLog.keys());

//   console.log(moodLog);
//   // console.log(Object.entries(moodLog));
//   for (var key in moodLog) {
//     console.log(moodLog[key]);
//     //     console.log(moodLog[key]);
//     //     if (moodLog[key].mood === 'Anxious'){
//     //         var time = moodLog[key].time;
//     //         // add conditional loop for if time < 3600
//     //         // x is the array of the web times for the hour leading up to the mood log
//     //         const x  = hourBeforeArray(time)
//     //         console.log(x);
//     //         const distinctDomains = [...new Set(x.map(x => x.domain))];
//     //         console.log(distinctDomains);
//     //         for (var j = 0; j < distinctDomains.length; j++){
//     //             var domTime = 0;
//     //             for (var k = 0; k < x.length; k++){
//     //                 if (x[k].domain === distinctDomains[j]){
//     //                     console.log('works!!!')
//     //                     domTime += x[k].timeDiff;
//     //                 }
//     //             }
//     //             const domainTime = {
//     //                 'domain' : distinctDomains[j],
//     //                 'time' : domTime
//     //             }
//     //             timeByDomain.push(domainTime);
//     //         }
//     //     }
//     // }
//     // const topFive = timeByDomain.sort(compare);
//     // console.log(timeByDomain);
//     // const anxiousData = [
//     //     {name: topFive[0].domain, seconds: topFive[0].time},
//     //     {name: topFive[1].domain, seconds: topFive[1].time},
//     //     {name: topFive[2].domain, seconds: topFive[2].time},
//     //     {name: topFive[3].domain, seconds: topFive[3].time},
//     //     {name: topFive[4].domain, seconds: topFive[4].time},
//     // ]
//     //return(anxiousData);
//   }
//   return ([]);
// }



//ending here
// const anxiousData = [
//     {name: timeByDomain[0].domain, seconds: timeByDomain[0].time},
//     {name: timeByDomain[1].domain, seconds: timeByDomain[1].time},
//     {name: timeByDomain[2].domain, seconds: timeByDomain[2].time},
//     {name: timeByDomain[3].domain, seconds: timeByDomain[3].time},
//     {name: timeByDomain[4].domain, seconds: timeByDomain[4].time},
// ]
// };
//export default tim;

// // console.log(timeByDomain);
export {getAnxious, getConfident, getSad, getHappy}
// export const timeByDom = getAnxious();
