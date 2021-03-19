import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js'


function WebByMoodGraph(props) {
  const [data, setData] = useState([]);
  // const [title, setTitle] = useState();
  // currently setting title in Mood component rather than here

  useEffect(() => {
    var currentMood = props.currentMood;
    const currentMoodData = props.graphData;
    if (currentMoodData === undefined) {
      setData([{ name: `You have not logged ${currentMood} yet`, seconds: 0 }]);
    } else {
      setData(currentMoodData);
    }
    // setTitle(currentMood);
  }, [props.currentMood, props.graphData]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* <Title>Mood: {title1}</Title> */}
        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={data} margin={{ top: 16, right: 16, left: 24, bottom: 0 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
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