import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function WebByMoodGraph(props) {


  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [title1, setTitle1] = useState();


  useEffect(() => {
    // console.log("useEffect run");
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    async function getData() {
      // console.log("get Data run");
      var currentMood = props.currentMood;
      // console.log(`current mood is ${currentMood}`);
      const currentMoodData = await getMoodData(currentMood);
      // const focused = await getMoodData1('Focused');
      setData1(currentMoodData);
      setTitle1(currentMood);
      // CreateButtons();

      setLoading(false);
    }
    // if (loading) {
    //   getData();
    // }
    getData();
  }, [props.currentMood]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.


  return (
    <div>
      <h3>
        Mood: {title1}
      </h3>
      <BarChart width={1000} height={500} data={data1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seconds" fill="#8884d8" />
      </BarChart>
      <br />
    </div>
  )
}
export default WebByMoodGraph;