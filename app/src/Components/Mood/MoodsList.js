import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function MoodsList(props) {

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    const setMoodData = async (e) => {
      const mood = e.target.className;
      props.setCurrentMood(mood);
      // console.log(mood);
      // const mood = e;
      // const a = await getMoodData(mood);
    };

    async function createButtons() {
      // console.log("createButtons run");
      var [orderedMoods, moodFrequency] = await getTopMoodsToday();

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
      for (var i = 0; i < allMoods.length; i++) {
        let newButton = document.createElement('button');
        if (allMoods[i] in moodFrequency) {
          newButton.innerHTML = allMoods[i] + ": " + moodFrequency[allMoods[i]];
        } else {
          newButton.innerHTML = allMoods[i] + ": 0";
        }
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setMoodData);
        newButton.className = allMoods[i];
        // console.log(newButton.className);
      }
    }
    if (loading) {
      createButtons();
      setLoading(false);
    }
  }, []);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.å
  return (
    <div>
      <div id='moodButtonSet'></div>
    </div>
  )
}
export default MoodsList;