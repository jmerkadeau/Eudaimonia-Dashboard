import React, { Component } from 'react';


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
// for each domain, get time spent today
function getTimeByDomainToday(webLog) {
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

// for each domain, get time spent all time
function getTimeByDomainAllTime(allTimeWeb) {
  // console.log(allTimeWeb);
  var timeByDomain = [];
  for (var key in allTimeWeb) {
    // console.log(key, allTimeWeb[key]);
    const a = {
      'domain': key,
      'time': allTimeWeb[key]
    };
    timeByDomain.push(a);
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
};

// for each period of the day get the total time spent
function getTimeByPeriodToday(webLog) {
  var timeByDomain = [];
  const webLogWithStartAndTime = [];
  for (var i = 0; i < webLog.length; i++) {
    var start = webLog[i].start;
    var end = webLog[i].end;
    var timeSpent = end - start;
    const a = {
      'domain': webLog[i].domain,
      'start': start,
      'timeSpent': timeSpent
    };
    webLogWithStartAndTime.push(a);
  }
  // console.log(webLogWithTime);
  // need to separate by time of day
  const timesOfDay = ['0:00 - 4:00', '4:00 - 8:00', '8:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00', '20:00 - 24:00'];
  const timesOfDayNames = ['Early Morning', 'Dawn', 'Morning', 'Afternoon', 'Evening', 'Night' ];
  let webTimePerPeriod = [0, 0, 0, 0, 0, 0]

  for (var j = 0; j < webLogWithStartAndTime.length; j++){
    let check = webLogWithStartAndTime[j].start;
    if (check <= 14400){
      webTimePerPeriod[0] += webLogWithStartAndTime[j].timeSpent;
    }
    else if (check > 14400 && check <= 28800){
      webTimePerPeriod[1] += webLogWithStartAndTime[j].timeSpent;
    }
    else if (check > 28800 && check <= 43200){
      webTimePerPeriod[2] += webLogWithStartAndTime[j].timeSpent;
    }
    else if (check > 43200 && check <= 57600){
      webTimePerPeriod[3] += webLogWithStartAndTime[j].timeSpent;
    }
    else if (check > 57600 && check <= 72000){
      webTimePerPeriod[4] += webLogWithStartAndTime[j].timeSpent;
    }
    else if (check > 72000 && check <= 86400){
      webTimePerPeriod[5] += webLogWithStartAndTime[j].timeSpent; 
    }
  }

  let areaData = []
  for (var k = 0; k < webTimePerPeriod.length; k++){
    let dataPoint = {
      'name': timesOfDayNames[k],
      'period': timesOfDay[k],
      'time': webTimePerPeriod[k]
    }
    areaData.push(dataPoint)
  }

  // let earlyMorning = 0;
  // let dawn = 0;
  // let morning = 0;
  // let afternoon = 0;
  // let evening = 0;
  // let night = 0;

  return (areaData);
}

// create moodByWeb data for today
var getWebData = (moodLog, webLog) => {
  // console.log("[MoodByWebsite] getWebData run");
  var moodsAfterWebsite = {};
  // const webLog = await getWebLog();
  // const topSites = getTopWebsitesByTime(webLog);
  // console.log(moodLog);
  for (var i = 0; i < moodLog.length; i++) {
    var mood = moodLog[i].mood;
    // console.log(mood);
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
  }
  // console.log(moodsAfterWebsite);
  return moodsAfterWebsite;
};

export { getWebData, getTimeByDomainToday, getTimeByDomainAllTime };
