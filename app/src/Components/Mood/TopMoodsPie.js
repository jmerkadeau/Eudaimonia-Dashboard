import React, { useState, useEffect } from 'react';
import { getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopMoodsPie(props) {
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
      const orderedMoods = props.orderedMoods;
      const moodFrequency = props.moodFrequency;

      // console.log(orderedMoods);
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
  }, [props.orderedMoods, props.moodFrequency]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.


  return (
    <PieChart width={400} height={400}>
      <Pie dataKey="value" isAnimationActive={true} data={pieData} />
      <Tooltip />
    </PieChart>
  )
}
export default TopMoodsPie;