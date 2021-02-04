import React, { useState, useEffect } from 'react';
import { getMoodData } from '../../Data/WebsiteByMood.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function WebByMoodGraph() {

  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState([]);
  const [title1, setTitle1] = useState();

  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    function CreateButtons() {
      const allMoods = [
        'Anxious', 'Confident', 'Sad', 'Happy', 'Tired',
        'Energized', 'Frustrated', 'Calm', 'Connected',
        'Distracted', 'Focused'
      ];
      let buttonSet1 = document.getElementById('buttonSet1');
      for (var i = 0; i < allMoods.length; i++) {
        let newButton = document.createElement('button');
        newButton.innerHTML = allMoods[i];
        buttonSet1.appendChild(newButton);
        newButton.addEventListener('click', setMoodData);
        newButton.className = allMoods[i];
      }

    }
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    async function getData() {
      const anxious = await getMoodData('Anxious');
      // const focused = await getMoodData1('Focused');
      setData1(anxious);
      setTitle1('Anxious');
      CreateButtons();

      setLoading(false);
    }
    if (loading) {
      getData();
    }
  }, []);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  const setMoodData = async (e) => {
    const mood = e.target.className;
    const a = await getMoodData(mood);
    setData1(a);
    setTitle1(mood);
  };
  return (
    <div>
      <div id='buttonSet1'>
      </div>
      <h3>
        Mood: {title1}
      </h3>
      <BarChart width={1000} height={500} data={data1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seconds" fill="#8884d8" />
      </BarChart>
      <br />
    </div>
  )
}
export default WebByMoodGraph;