import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
// I only imported the elements of recharts that I needed, there are a lot more you can use

const useStyles = makeStyles((theme) => ({
  legend: {
  }
}));

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

function TopWebGraph(props) {

  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState('minutes');

  useEffect(() => {
    var currentWebData = [];
    if (props.allTime) {
      props.topSites.forEach(function (item, index) {
        currentWebData.push({
          name: processURL(item.name),
          hours: item.seconds / 3600
        });
      });
      setData(currentWebData);
      setDataKey('hours');
    } else {
      props.topSites.forEach(function (item, index) {
        currentWebData.push({
          name: processURL(item.name),
          minutes: item.seconds / 60
        });
      });
      setData(currentWebData);
      setDataKey('minutes');
    }
    // setData(currentWebData);
    // createButtons();
  }, [props.allTime, props.topSites]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* <ResponsiveContainer width='100%' height={500}> */}

        <BarChart width={900} height={600} data={data} margin={{ top: 5, right: 80, left: 80, bottom: -20 }}>

          {/* <BarChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 50}}> */}
          {/* <CartesianGrid strokeDasharray="2 2 2" /> */}
          <XAxis dataKey="name" angle={30} textAnchor='start' interval={0} height={220} allowDataOverflow tickFormatter={processURL} />
          <YAxis />
          <Tooltip formatter={(value) => value.toFixed(1)} />
          <Legend verticalAlign='top' align='right' />
          <Bar dataKey={dataKey} fill={theme.palette.primary.main} />
        </BarChart>
      </div>
    </ThemeProvider>

  )
}
export default TopWebGraph;