import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core';


// I only imported the elements of recharts that I needed, there are a lot more you can use
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb",
    }
  }
});

function MoodsList(props) {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    const setMoodData = (e) => {
      const mood = e.target.className;
      props.setCurrentMood(mood);
      // console.log(mood);
      // const mood = e;
      // const a = await getMoodData(mood);
    };

    function createButtons() {
      // console.log("createButtons run");
      // var [orderedMoods, moodFrequency] = await getTopMoodsToday();
      const orderedMoods = props.orderedMoods;
      const moodFrequency = props.moodFrequency;

      // console.log(typeof []);

      var allMoods = [
        'Anxious', 'Sad', 'Happy', 'Tired',
        'Energized', 'Frustrated', 'Calm',
        'Distracted', 'Focused', 'Lonely'
      ];
      allMoods = allMoods.filter((el) => !orderedMoods.includes(el));
      allMoods = orderedMoods.concat(allMoods);

      // console.log(allMoods);
      // console.log(moodFrequency);
      let buttonSet1 = document.getElementById('moodButtonSet');
      var buttonSet = [];
      for (var i = 0; i < allMoods.length; i++) {
        let newButton = document.createElement('button');
        // let newButton = React.createElement(Button, {variant: 'contained', color: 'primary', onClick: () => {setMoodData()}}, allMoods[i] + ": " + moodFrequency[allMoods[i]]);
        if (allMoods[i] in moodFrequency) {
          newButton.innerHTML = allMoods[i] + ": " + moodFrequency[allMoods[i]];
        } else {
          newButton.innerHTML = allMoods[i] + ": 0";
        }
        // buttonSet.push(newButton);
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setMoodData);
        newButton.className = allMoods[i];
        console.log(newButton.className);
      }

      // const DivContainer = React.createElement('div', {}, buttonSet);  
  
    }
    if (loading) {
      createButtons();
      setLoading(false);
    }
  }, []);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.å
  return (
    <ThemeProvider>
      <div>
        <div id='moodButtonSet'></div>
        {/* <DivContainer></DivContainer> */}
      </div><br/>
    </ThemeProvider>
  )
}
export default MoodsList;