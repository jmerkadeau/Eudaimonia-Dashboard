import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Tooltip, Cell
} from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function TopMoodsPieByWeb(props) {
  const [pieData, setPieData] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.

    // compare function to order items in pieData
    function compare(a, b) {
      const timeA = a.value;
      const timeB = b.value;

      let comparison = 0;
      if (timeA > timeB) {
        comparison = -1;
      }
      else if (timeA < timeB) {
        comparison = 1;
      }
      return comparison;
    }

    const setCurrentSite = (e) => {
      const site = e.target.className;
      props.setSite(site);
    };

    function createButtons() {
      const topSites = props.topSites;
      console.log(topSites);
      let buttonSet1 = document.getElementById('webButtonSet2');
      buttonSet1.innerHTML = "";
      console.log(buttonSet1);
      for (var i = 0; i < topSites.length; i++) {
        let newButton = document.createElement('button');
        newButton.innerHTML = topSites[i].name + ": " + topSites[i].seconds;
        newButton.className = topSites[i].name;
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setCurrentSite);
      }
    }

    function createPieChartData() {
      // console.log("[topMoodsPieByWeb] createPieChartData run");
      const currentSite = props.currentSite.replaceAll('.', '%2E');
      const moodByWebData = props.moodByWebData;
      if (currentSite in moodByWebData) {
        const temp = moodByWebData[currentSite];
        var pieChartData = [];
        for (var key in temp) {
          pieChartData.push({
            name: key,
            value: temp[key]
          });
        }
        pieChartData.sort(compare);
        setPieData(pieChartData);
      } else {
        console.log("No moods associated with site from today");
        setPieData([]);
      }

    }

    setData(props.topSites);
    createPieChartData();
    createButtons();
  }, [props.moodByWebData, props.currentSite]);
  // }, [props.moodByWebData, props.currentSite]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  let colors = []
  const fullColors = ['#265366', '#2d6279', '#34718b', '#3b809e', '#428fb1', '#58a1c1', '#61a6c4', '#74b0cb', '#86bbd2', '#99c5d9'];
  if (pieData.length <= 2){
    colors = [fullColors[5], fullColors[7]];
  }
  else if (pieData.length > 2 && pieData.length <= 4){
    colors = [fullColors[3], fullColors[4], fullColors[5], fullColors[7]]
  }
  else if (pieData.length > 4 && pieData.length <= 6){
    colors = [fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[7], fullColors[8]]
  }
  else if (pieData.length > 6 && pieData.length <= 8){
    colors = [fullColors[1], fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[6], fullColors[7], fullColors[8]]
  }
  else{
    colors = fullColors;
  }

  let renderLabel = function(entry) {
    return entry.name;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="webButtonSet2"></div>

      <PieChart width={400} height={400}>
        <Pie 
          dataKey="value" 
          isAnimationActive={true} 
          data={pieData}
          label={renderLabel}>
          {pieData.map((entry, index) => (
            <Cell fill={colors[index]} />
          ))}
          
        </Pie>
        <Tooltip />
      </PieChart>
    </ThemeProvider>
  )
}
export default TopMoodsPieByWeb;