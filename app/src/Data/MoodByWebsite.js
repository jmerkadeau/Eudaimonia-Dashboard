import React, { Component } from 'react';
import getMoodLog from './MoodData.js';
import getWebLog from './WebData.js';


// hourBeforeArray creates an array with all of
// the logged web visirs that a start time within one
// hour before the time of the specified mood log
const hourAfterArray = (time, webLog) => {
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

function getTopWebsitesByTime(webLog) {
  var timeByDomain = [];
  const webLogWithTime = [];
  for (var i = 0; i < webLog.length; i++) {
    var start = webLog[i].start;
    var end = webLog[i].end;
    var timeDiff = end - start;
    const a = {
      'domain': webLog[i].domain,
      'timeDiff': timeDiff
    };
    webLogWithTime.push(a);
  }
  // console.log(webLogWithTime);
  const distinctDomains = [...new Set(webLog.map(webLog => webLog.domain))];
  for (var j = 0; j < distinctDomains.length; j++) {
    var domTime = 0;
    for (var k = 0; k < webLogWithTime.length; k++) {
      if (webLogWithTime[k].domain === distinctDomains[j]) {
        domTime += webLogWithTime[k].timeDiff;
      }
    }
    const domainTime = {
      'domain': distinctDomains[j],
      'time': domTime
    }
    timeByDomain.push(domainTime);
  }
  const sortedTimeByDomain = timeByDomain.sort(compare);
  // console.log(sortedTimeByDomain);
  var top = [];
  const TOP_LIMIT = 10;
  for (var l = 0; l < TOP_LIMIT; l++) {
    // console.log(sortedTimeByDomain[l]);
    if (sortedTimeByDomain[l] != null) {
      var twoEDomain = sortedTimeByDomain[l].domain;
      var fixedDomain = twoEDomain.replaceAll('%2E', '.');
      top[l] = { name: fixedDomain, seconds: sortedTimeByDomain[l].time };
    }
  }
  // console.log(top);
  return (top);
}

var getWebData = async () => {
  console.log("getWebData run");
  var moodsAfterWebsite = {};
  const moodLog = await getMoodLog();
  const webLog = await getWebLog();
  const topSites = getTopWebsitesByTime(webLog);
  // console.log(moodLog);
  for (var i = 0; i < moodLog.length; i++) {
    var mood = moodLog[i].mood;
    console.log(mood);
    var time = moodLog[i].time;
    const prevHourWeb = hourAfterArray(time, webLog);
    const distinctDomains = [...new Set(prevHourWeb.map(prevHourWeb => prevHourWeb.domain))];
    // console.log(distinctDomains);
    for (var j = 0; j < distinctDomains.length; j++) {
      if (distinctDomains[j] in moodsAfterWebsite) {
        // contains domain
        const x = moodsAfterWebsite[distinctDomains[j]];
        if (mood in x) {
          // contains mood
          x[mood] += 1;

        } else {
          // doesn't contain mood
          x[mood] = 1;
        }
      } else {
        // doesn't contain domain yet
        moodsAfterWebsite[distinctDomains[j]] = {};
        moodsAfterWebsite[distinctDomains[j]][mood] = 1;
      }
    }
    // console.log(moodsAfterWebsite);


    // x = x.concat(y);

  }
  return [topSites, moodsAfterWebsite];
  // console.log(x);
  // console.log(x.length);
  // console.log(x.slice());


  // console.log(moodsAfterWebsite);
  // const sortedTimeByDomain = timeByDomain.sort(compare);
  // console.log(sortedTimeByDomain);
  // var topFive = [];
  // for (var l = 0; l < 5; l++) {
  //   // console.log(sortedTimeByDomain[l]);
  //   if (sortedTimeByDomain[l] != null) {
  //     var twoEDomain = sortedTimeByDomain[l].domain;
  //     var fixedDomain = twoEDomain.replaceAll('%2E', '.')
  //     topFive[l] = { name: fixedDomain, seconds: sortedTimeByDomain[l].time }
  //   }
  // }
  // if (topFive === undefined || topFive.length === 0) {
  //   topFive = [{ name: `You have not logged ${mood} today`, seconds: 0 }];
  // }
  // return (topFive);
};

export { getWebData };
