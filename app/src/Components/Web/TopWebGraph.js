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

function TopWebGraph(props) {

  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState('minutes');

  useEffect(() => {
    var currentWebData = [];
    if (props.allTime) {

      props.topSites.forEach(function (item, index) {
        currentWebData.push({
          name: item.name,
          hours: (item.seconds / 3600).toFixed(1)
        });
      });
      setData(currentWebData);

      setDataKey('hours');
    } else {
      props.topSites.forEach(function (item, index) {
        currentWebData.push({
          name: item.name,
          minutes: Math.round(item.seconds / 60)
        });
      });
      setData(currentWebData);
      setDataKey('minutes');

    }
    setData(currentWebData);
    // createButtons();
  }, [props]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <BarChart width={800} height={500} data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign='bottom' wrapperStyle={{ position: 'relative' }} align='center' />
          <Bar dataKey={dataKey} fill={theme.palette.primary.main} />
        </BarChart>
      </div>
    </ThemeProvider>

  )
}
export default TopWebGraph;