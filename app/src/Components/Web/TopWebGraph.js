import React, { useState, useEffect } from 'react';
import { getWebData, getTopWebsitesByTime } from '../../Data/MoodByWebsite.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopWebGraph(props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("useEffect run");
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    async function getData() {
      console.log("[MoodByWebGraph] get Data run");
      setData(props.topSites);

    }

    const setCurrentSite = async (e) => {
      const site = e.target.className;
      props.setSite(site);
      // console.log(mood);
      // const mood = e;
      // const a = await getMoodData(mood);
    };

    async function createButtons() {
      // console.log(props.topSites);
      const topSites = props.topSites;


      let buttonSet1 = document.getElementById('webButtonSet');
      for (var i = 0; i < topSites.length; i++) {
        let newButton = document.createElement('button');
        // console.log(topSites[i]);
        newButton.innerHTML = topSites[i].name + ": " + topSites[i].seconds;
        newButton.className = topSites[i].name;
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setCurrentSite);
        // newButton.className = allMoods[i];
        // console.log(newButton.className);
      }
    }

    getData();
    createButtons();
  }, [props.topSites]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.


  return (
    <div>
      <BarChart width={1000} height={500} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seconds" fill="#8884d8" />
      </BarChart>
      <br />
      <div id="webButtonSet"></div>
    </div>

  )
}
export default TopWebGraph;