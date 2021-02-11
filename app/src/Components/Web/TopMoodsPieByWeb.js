import React, { useState, useEffect } from 'react';
import { getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopMoodsPieByWeb(props) {


  const [pieData, setPieData] = useState([]);


  useEffect(() => {
    // console.log("useEffect run");
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    async function getData() {
      // console.log("[topMoodsPieByWeb] getData run");
      // console.log(props.moodByWebData);
      const currentSite = props.currentSite.replaceAll('.', '%2E');
      const moodByWebData = props.moodByWebData;
      // console.log(currentSite);
      // console.log(moodByWebData);
      if (currentSite in moodByWebData) {
        const temp = moodByWebData[currentSite];
        var pieChartData = [];
        for (var key in temp) {
          pieChartData.push({
            name: key,
            value: temp[key]
          });
        }
        setPieData(pieChartData);
      } else {
        console.log("No moods associated with site from today");
        setPieData([]);
      }

    }

    getData();
  }, [props.moodByWebData, props.currentSite]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.


  return (
    <PieChart width={400} height={400}>
      <Pie dataKey="value" isAnimationActive={true} data={pieData} />
      <Tooltip />
    </PieChart>
  )
}
export default TopMoodsPieByWeb;