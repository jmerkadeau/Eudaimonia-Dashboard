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
}))

function TopWebGraph(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.

    const setCurrentSite = (e) => {
      const site = e.target.className;
      props.setSite(site);
    };

    // function createButtons() {
    //   const topSites = props.topSites;
    //   let buttonSet1 = document.getElementById('webButtonSet');
    //   buttonSet1.innerHTML = "";
    //   for (var i = 0; i < topSites.length; i++) {
    //     let newButton = document.createElement('button');
    //     newButton.innerHTML = topSites[i].name + ": " + topSites[i].seconds;
    //     newButton.className = topSites[i].name;
    //     buttonSet1.appendChild(newButton);
    //     newButton.addEventListener('click', setCurrentSite);
    //   }
    // }

    setData(props.topSites);
    // createButtons();
  }, [props]);
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
          <XAxis dataKey="name" angle={-30} textAnchor='end' interval={0} height={220} allowDataOverflow  />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign='top' align='right' />
          <Bar dataKey="seconds" fill={theme.palette.primary.main} />
        </BarChart>
      {/* </ResponsiveContainer> */}

        {/* <br /> */}
        {/* <div id="webButtonSet"></div> */}
      </div>
    </ThemeProvider>

  )
}
export default TopWebGraph;