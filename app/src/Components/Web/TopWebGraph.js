import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopWebGraph(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.

    const setCurrentSite = (e) => {
      const site = e.target.className;
      props.setSite(site);
    };

    function createButtons() {
      const topSites = props.topSites;
      let buttonSet1 = document.getElementById('webButtonSet');
      buttonSet1.innerHTML = "";
      for (var i = 0; i < topSites.length; i++) {
        let newButton = document.createElement('button');
        newButton.innerHTML = topSites[i].name + ": " + topSites[i].seconds;
        newButton.className = topSites[i].name;
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setCurrentSite);
      }
    }

    setData(props.topSites);
    createButtons();
  }, [props]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <BarChart width={1000} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="seconds" fill={theme.palette.primary.main} />
        </BarChart>
        <br />
        <div id="webButtonSet"></div>
      </div>
    </ThemeProvider>

  )
}
export default TopWebGraph;