import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import Title from './../Dashboard/Title.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

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
    function getData() {
      console.log("[WebByMoodGraph] get Data run");
      var currentMood = props.currentMood;
      console.log(currentMood);
      // const moodLog = props.moodLog;
      // console.log(`current mood is ${currentMood}`);
      const currentMoodData = props.moodData;
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
  }, [props.currentMood, props.moodData]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#347aeb",
        light: "#3d7feb"
      }
    }
  });


  return (
    <ThemeProvider theme={theme}>
    <div>
      {/* <Title>Mood: {title1}</Title> */}
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data1} margin={{ top: 16, right: 16, left: 24, bottom: 0 }}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip />
          <Legend />
          <Bar dataKey="seconds" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
      {/* <br /> */}
    </div>
    </ThemeProvider>
  )
}
export default WebByMoodGraph;