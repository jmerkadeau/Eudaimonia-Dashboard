import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopMoodsPieByWeb(props) {
  const [pieData, setPieData] = useState([]);


  useEffect(() => {
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.

    // compare function to order items in pieData
    function compare(a, b) {
      const timeA = a.value;
      const timeB = b.value;

      let comparison = 0;
      if (timeA > timeB) {
        comparison = -1;
      }
      else if (timeA < timeB) {
        comparison = 1;
      }
      return comparison;
    }

    function createPieChartData() {
      // console.log("[topMoodsPieByWeb] createPieChartData run");
      const currentSite = props.currentSite.replaceAll('.', '%2E');
      const moodByWebData = props.moodByWebData;
      if (currentSite in moodByWebData) {
        const temp = moodByWebData[currentSite];
        var pieChartData = [];
        for (var key in temp) {
          pieChartData.push({
            name: key,
            value: temp[key]
          });
        }
        pieChartData.sort(compare);
        setPieData(pieChartData);
      } else {
        console.log("No moods associated with site from today");
        setPieData([]);
      }

    }

    createPieChartData();
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