import React, { Component } from 'react';
import getMoodLog from './MoodData.js';
import getWebLog from './WebData.js';


// hourBeforeArray creates an array with all of
// the logged web visirs that a start time within one
// hour before the time of the specified mood log
const hourBeforeArray = (time, webLog) => {
  var hba = [];
  for (var i = 0; i < webLog.length; i++) {
    var start = webLog[i].start;
    var end = webLog[i].end;
    if (start > (time - 3600) && start < time) {
      var timeDiff = end - start;
      const a = {
        'domain': webLog[i].domain,
        'timeDiff': timeDiff
      };
      hba.push(a);
    }
  }
  return (hba);
};
// This function is called to sort the objects in an array from most to least time by domain
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

var getTopMoodsToday = (moodLog) => {
  var moodFrequency = {};
  var orderedMoods = [];
  // console.log("getTopMoodsToday");
  // console.log(moodLog);
  for (var i = 0; i < moodLog.length; i++) {
    if (moodLog[i].mood in moodFrequency) {
      moodFrequency[moodLog[i].mood] += 1;
    } else {
      moodFrequency[moodLog[i].mood] = 1;
      orderedMoods.push(moodLog[i].mood);
    }
  }
  function compareFrequency(a, b) {
    return moodFrequency[b] - moodFrequency[a];
  }
  orderedMoods.sort(compareFrequency);
  // console.log(orderedMoods);
  return [orderedMoods, moodFrequency];
};

var getDataForMood = (mood, moodLog, webLog) => {
  var timeByDomain = [];
  // create top 5 websites by mood
  var x = []
  for (var i = 0; i < moodLog.length; i++) {
    if (moodLog[i].mood === mood) {
      var time = moodLog[i].time;
      // x is the array of the web times for the hour leading up to the mood log
      const y = hourBeforeArray(time, webLog);
      x = x.concat(y);
    }
  }
  // console.log(x);
  const distinctDomains = [...new Set(x.map(x => x.domain))];
  for (var j = 0; j < distinctDomains.length; j++) {
    var domTime = 0;
    for (var k = 0; k < x.length; k++) {
      if (x[k].domain === distinctDomains[j]) {
        domTime += x[k].timeDiff;
      }
    }
    const domainTime = {
      'domain': distinctDomains[j],
      'time': domTime
    }
    timeByDomain.push(domainTime);
  }
  const sortedTimeByDomain = timeByDomain.sort(compare);
  console.log(sortedTimeByDomain);
  var topFive = [];
  for (var l = 0; l < 5; l++) {
    // console.log(sortedTimeByDomain[l]);
    if (sortedTimeByDomain[l] != null) {
      var twoEDomain = sortedTimeByDomain[l].domain;
      var fixedDomain = twoEDomain.replaceAll('%2E', '.')
      topFive[l] = { name: fixedDomain, seconds: sortedTimeByDomain[l].time }
    }
  }
  if (topFive === undefined || topFive.length === 0) {
    topFive = [{ name: `You have not logged ${mood} today`, seconds: 0 }];
  }
  return (topFive);
};

export { getDataForMood, getTopMoodsToday };
