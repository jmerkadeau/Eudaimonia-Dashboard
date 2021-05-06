import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Sector, Label } from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../LandingPage/Sections/Theme.js';
import { date } from './../../Data/GetDate.js';

// I only imported the elements of recharts that I needed, there are a lot more you can use
var getOrderedMoods = (moodFrequency) => {
  var orderedMoods = Object.keys(moodFrequency);
  function compareFrequency(a, b) {
    return moodFrequency[b] - moodFrequency[a];
  }
  orderedMoods.sort(compareFrequency);
  return orderedMoods;
};
function FriendMoodsPie(props) {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // console.log("useEffect run");
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    function getData() {
      // console.log("get Data run");

      // console.log(`current mood is ${currentMood}`);

      // var [orderedMoods, moodFrequency] = await getTopMoodsToday();
      // const orderedMoods = props.orderedMoods;
      const moodData = props.moodData;
      // console.log(orderedMoods);
      const today = moodData[date];
      console.log(today);
      var moodFrequency = {};
      for (var time in today) {
        console.log(time, today[time].mood);
        const mood = today[time].mood;
        if (mood in moodFrequency) {
          moodFrequency[mood] += 1;
        } else {
          moodFrequency[mood] = 1;
        }
      }
      const orderedMoods = getOrderedMoods(moodFrequency);
      console.log(orderedMoods);
      var pieChartData = [];
      orderedMoods.forEach(function (mood) {
        // console.log(mood);
        // console.log(moodFrequency[mood]);
        pieChartData.push({
          name: mood,
          value: moodFrequency[mood]
        });
      });
      // console.log("setPieData running");
      // console.log(pieChartData);
      setPieData(pieChartData);

    }
    getData();
  }, [props.moodFrequency]);



  // const colors = ['#2455A4', '#2E6DD3', '#4887ED',
  // '#70A1F1', '#99BCF5', '#C2D7F9', '#EAF1FD'];
  let colors = []
  const fullColors = ['#265366', '#2d6279', '#34718b', '#3b809e', '#428fb1', '#58a1c1', '#61a6c4', '#74b0cb', '#86bbd2', '#99c5d9'];
  if (pieData.length <= 2) {
    colors = [fullColors[5], fullColors[7]];
  }
  else if (pieData.length > 2 && pieData.length <= 4) {
    colors = [fullColors[3], fullColors[4], fullColors[5], fullColors[7]]
  }
  else if (pieData.length > 4 && pieData.length <= 6) {
    colors = [fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[7], fullColors[8]]
  }
  else if (pieData.length > 6 && pieData.length <= 8) {
    colors = [fullColors[1], fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[6], fullColors[7], fullColors[8]]
  }
  else {
    colors = fullColors;
  }


  let renderLabel = function (entry) {
    return entry.name;
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={pieData}
          cx={200}
          cy={150}
          outerRadius={100}
          fill="#347aeb"
          label={renderLabel}>
          {pieData.map((entry, index) => (
            <Cell fill={colors[index]} />
          ))}
        </Pie>
        {/* <Tooltip content={<CustomTooltip />}/> */}
        <Tooltip />
      </PieChart>
    </ThemeProvider>
    //
    // <PieChart width={400} height={400}>
    //   {/* <Pie
    //       data={pieData}
    //       fill="#8884d8"
    //       dataKey="value"
    //       label
    //       isAnimationActive={true}
    //     >
    //     <Tooltip />
    //     {pieData.map((entry, index) => (
    //       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //     ))}
    //   </Pie> */}
    //   <Pie dataKey="value" isAnimationActive={true} data={pieData} label='key' />
    //   <Tooltip />
    // </PieChart>
  )
}
export default FriendMoodsPie;