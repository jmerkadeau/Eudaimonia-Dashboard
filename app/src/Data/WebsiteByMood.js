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

// Legacy Function
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
var getMoodFrequencyToday = (moodLog) => {
  var moodFrequency = {};
  // console.log("getTopMoodsToday");
  // console.log(moodLog);
  for (var i = 0; i < moodLog.length; i++) {
    if (moodLog[i].mood in moodFrequency) {
      moodFrequency[moodLog[i].mood] += 1;
    } else {
      moodFrequency[moodLog[i].mood] = 1;
    }
  }

  // console.log(orderedMoods);
  return moodFrequency;
};
var getOrderedMoods = (moodFrequency) => {
  var orderedMoods = Object.keys(moodFrequency);
  function compareFrequency(a, b) {
    return moodFrequency[b] - moodFrequency[a];
  }
  orderedMoods.sort(compareFrequency);
  return orderedMoods;
};

// Legacy Function
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
  // console.log(sortedTimeByDomain);

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

var getWebByMoodToday = (moodLog, webLog) => {
  // console.log(moodLog);
  // console.log(webLog);
  // console.log("getWebByMoodToday");
  var output = {};
  // create top 5 websites by mood
  var intervalsByMood = {};
  for (var i = 0; i < moodLog.length; i++) {
    // console.log(moodLog[i]);
    var time = moodLog[i].time;
    // x is the array of the web times for the hour leading up to the mood log
    const y = hourBeforeArray(time, webLog);
    if (moodLog[i].mood in intervalsByMood) {
      // console.log("HERE0", moodLog[i].mood, y);
      // console.log("HERE", intervalsByMood[moodLog[i].mood]);
      intervalsByMood[moodLog[i].mood] = intervalsByMood[moodLog[i].mood].concat(y);
      // console.log("HERE2", intervalsByMood[moodLog[i].mood]);

    } else {
      intervalsByMood[moodLog[i].mood] = y;
    }
    // console.log(intervalsByMood);
  }
  // console.log(intervalsByMood);
  for (var mood in intervalsByMood) {
    const x = intervalsByMood[mood];
    const distinctDomains = [...new Set(x.map(x => x.domain))];
    // console.log(mood, distinctDomains);
    for (var j = 0; j < distinctDomains.length; j++) {
      var domTime = 0;
      for (var k = 0; k < x.length; k++) {
        if (x[k].domain === distinctDomains[j]) {
          domTime += x[k].timeDiff;
        }
      }

      if (mood in output) {
        if (distinctDomains[j] in output[mood]) {
          output[mood][distinctDomains[j]] += domTime;
        } else {
          output[mood][distinctDomains[j]] = domTime;
        }
      } else {
        const domainTime = {
          [distinctDomains[j]]: domTime
        };
        output[mood] = domainTime;
      }
    }
  }
  return (output);
};
var getGraphableWebByMoodData = (webByMood, topN = 5) => {
  var output = {};
  for (var mood in webByMood) {
    const domainTimes = webByMood[mood];
    // console.log(mood, domainTimes);
    for (var domain in domainTimes) {
      const domainTime = {
        'domain': domain,
        'time': domainTimes[domain]
      };
      if (mood in output) {
        output[mood].push(domainTime);

      } else {
        output[mood] = [domainTime];
      }
    }
  }
  // get top N
  var topNDict = {};
  for (var mood in output) {
    // console.log(mood, output[mood]);
    var timeByDomain = output[mood];
    const sortedTimeByDomain = timeByDomain.sort(compare);
    // console.log(sortedTimeByDomain);
    var topFive = [];
    for (var l = 0; l < topN; l++) {
      // console.log(sortedTimeByDomain[l]);
      if (sortedTimeByDomain[l] != null) {
        var twoEDomain = sortedTimeByDomain[l].domain;
        var fixedDomain = twoEDomain.replaceAll('%2E', '.');
        topFive[l] = { name: fixedDomain, seconds: sortedTimeByDomain[l].time }
      }
    }
    if (topFive === undefined || topFive.length === 0) {
      topFive = [{ name: `You have not logged ${mood} yet`, seconds: 0 }];
    }
    topNDict[mood] = topFive;
  }
  return (topNDict);
};
var getMoodCount = (moodData) => {
  var count = 0;
  for (var mood in moodData) {
    count += moodData[mood];
  }
  return count;
};
const positiveMoods = ["Happy", "Energized", "Calm", "Focused"];

var getMoodScore = (moodData) => {
  var positive = 0;
  var total = 0;
  for (var mood in moodData) {
    // console.log(mood, moodData[mood]);
    if (positiveMoods.includes(mood)) {
      // console.log("HERE");
      positive += moodData[mood];
    }
    total += moodData[mood];
  }
  return (Math.round(positive * 100 / total));
  // return positive;
};

// for each period of the day get the total time spent
function getTimeByPeriodToday(webLog, moodLog) {
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
  console.log(webLogWithStartAndTime)
  // console.log(webLogWithTime);
  // need to separate by time of day
  const timesOfDay = ['0:00 - 4:00', '4:00 - 8:00', '8:00 - 12:00', '12:00 - 16:00', '16:00 - 20:00', '20:00 - 24:00'];
  // const timesOfDayNames = ['Early Morning', 'Dawn', 'Morning', 'Afternoon', 'Evening', 'Night' ];
  // const timesOfDayNames = ['2:00', '6:00', '10:00', '14:00', '18:00', '22:00'];
  const timesOfDayNames = [7200, 21600, 36000, 50400, 64800, 79200];
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

  console.log(webTimePerPeriod)

  let areaData = []
  for (var k = 0; k < webTimePerPeriod.length; k++){
    let dataPoint = {
      'name': timesOfDayNames[k],
      'period': timesOfDay[k],
      'time': parseFloat((webTimePerPeriod[k]/60).toFixed(1)),
      'label': 'Time of Day',
    }
    areaData.push(dataPoint)
  }

  // let moodsToday = [];

  for (var l = 0; l<moodLog.length; l++){
    let mood1 = {
      'name': moodLog[l].time,
      'period': moodLog[l].mood,
      'moodTime': 0,
      'label': 'Mood',
    };
    let mood2 = {
      'name': moodLog[l].time,
      'period': moodLog[l].mood,
      'moodTime': 80,
      'label': 'Mood',
    }
    areaData.push(mood1);
    areaData.push(mood2);

  }

  console.log(areaData)

  // let earlyMorning = 0;
  // let dawn = 0;
  // let morning = 0;
  // let afternoon = 0;
  // let evening = 0;
  // let night = 0;

  return (areaData);
}

export {
  getDataForMood, // Legacy Function
  getTopMoodsToday, // Legacy Function
  getWebByMoodToday,
  getGraphableWebByMoodData,
  getMoodFrequencyToday,
  getOrderedMoods,
  getMoodCount,
  getMoodScore,
  getTimeByPeriodToday
};
