import React, { useState, useEffect } from 'react';
import { getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import { PieChart, Pie, Tooltip, Cell, Sector, Label } from 'recharts';
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



  const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];
  let renderLabel = function(entry) {
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
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={pieData}
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#347aeb"
        label={renderLabel}>
      </Pie>
    {/* <Tooltip content={<CustomTooltip />}/> */}
      <Tooltip/>
  </PieChart>
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
export default TopMoodsPie;