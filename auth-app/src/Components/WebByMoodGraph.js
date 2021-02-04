import React, { useState, useEffect } from 'react';
import { getMoodData1 } from './WebsiteByMood.js'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function WebByMoodGraph() {

    const [ loading, setLoading ] = useState(true)
    const [ data1, setData1 ] = useState([])
    const [ title1, setTitle1 ] = useState()
    const [ data2, setData2 ] = useState([])
    const [ title2, setTitle2 ] = useState()

    useEffect(() => {
        // Function to create buttons for each mood.
        // It works but it might be better to just have it hard coded
        // since it never changes
        function CreateButtons() {
            const allMoods = [
                'Anxious', 'Confident', 'Sad', 'Happy', 'Tired', 
                'Energized', 'Frustrated', 'Calm', 'Connected', 
                'Distracted', 'Focused'
            ]
            let buttonSet1 = document.getElementById('buttonSet1');
            let buttonSet2 = document.getElementById('buttonSet2');
            for (var i = 0; i < allMoods.length; i++){
                let newButton = document.createElement('button');
                newButton.innerHTML = allMoods[i];
                buttonSet1.appendChild(newButton);
                newButton.addEventListener('click', setMoodData1)
                newButton.className = allMoods[i];
            }
            for (var i = 0; i < allMoods.length; i++){
                let newButton = document.createElement('button');
                newButton.innerHTML = allMoods[i];
                buttonSet2.appendChild(newButton);
                newButton.addEventListener('click', setMoodData2)
                newButton.className = allMoods[i];
            }
        }
        // This function is where WebsiteByMood.js is called to collect the data
        // we need for the graphs.
        // I initially get Anxious and Focused just to have two graphs up to start.
        // It is an async/await function so that it waits until 
        async function getData() {
            const anxious = await getMoodData1('Anxious');
            const focused = await getMoodData1('Focused');
            setData1(anxious);
            setTitle1('Anxious')
            setData2(focused);
            setTitle2('Focused')
            CreateButtons();

            setLoading(false);
        }
        if (loading) {
            getData();
        }
    }, []);
    // The empty array at the end of UseEffect makes it only run once
    // per render and only rerenders on state change.

    const setMoodData1 = async (e) => {
        const mood = e.target.className;
        const a = await getMoodData1(mood);
        setData1(a);
        setTitle1(mood);
    }
    const setMoodData2 = async (e) => {
        const mood = e.target.className;
        const a = await getMoodData1(mood);
        setData2(a);
        setTitle2(mood);
    }
    return(
        <div>
            <div id='buttonSet1'>
            </div>
            <h3>
                Mood: {title1}
            </h3>
            <BarChart width={1000} height={500} data={data1} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="seconds" fill="#8884d8" />
            </BarChart>
            <br/>
            <div id='buttonSet2'>
            </div>
            <h3>
                Mood: {title2}
            </h3>
            <BarChart width={1000} height={500} data={data2} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="seconds" fill="#8884d8" />
            </BarChart>
        </div>
    )
}
export default WebByMoodGraph;