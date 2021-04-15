import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';

function processURL(name) {
  if (name.includes('www.')) {
    name = name.replace('www.', '');
  }
  if (name.length > 22) {
    name = name.slice(0, 20);
    name = name.concat("..");
  }
  return name;
}
function WebByMoodGraph(props) {
  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState('minutes');
  // const [title, setTitle] = useState();
  // currently setting title in Mood component rather than here

  useEffect(() => {
    var currentMoodData = [];
    // console.log(props.graphData);
    if (props.allTime) {

      // console.log(currentMoodData);
      var currentMood = props.currentMood;
      if (props.graphData === undefined) {
        setData([{ name: `You have not logged ${currentMood} yet`, hours: 0 }]);
      } else {
        props.graphData.forEach(function (item, index) {
          var name = processURL(item.name);

          currentMoodData.push({
            name: name,
            hours: (item.seconds / 3600).toFixed(1)
          });
        });
        setData(currentMoodData);
      }

      setDataKey('hours');
    } else {

      // console.log(currentMoodData);
      var currentMood = props.currentMood;
      if (props.graphData === undefined) {
        setData([{ name: `You have not logged ${currentMood} yet`, minutes: 0 }]);
      } else {
        props.graphData.forEach(function (item, index) {
          var name = processURL(item.name);
          currentMoodData.push({
            name: name,
            minutes: Math.round(item.seconds / 60)
          });
        });
        setData(currentMoodData);
      }
      setDataKey('minutes');

    }
  }, [props.currentMood, props.graphData, props.allTime]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* <Title>Mood: {title1}</Title> */}
        <ResponsiveContainer width='100%' height={500}>
          <BarChart data={data} margin={{ top: 16, right: 40, left: 0, bottom: -100 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" angle={30} interval={0} textAnchor='start' height={200} allowDataOverflow />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign='top' align='right' />
            <Bar dataKey={dataKey} fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
        {/* <br /> */}
      </div>
    </ThemeProvider>
  )
}
export default WebByMoodGraph;