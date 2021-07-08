import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';

function MoodByTimeAllTime(props) {

    const [sortedMoods, setSortedMoods] = useState([]);

    useEffect(() => {
        function getData(){

            var sortMoods = props.sortedMoods;
            setSortedMoods(sortMoods);


        }
        getData();

    }, [props.sortedMoods]);

    console.log(sortedMoods);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                {/* <ResponsiveContainer width={500} height='80%'> */}
                <BarChart data={sortedMoods} width={420} height={320}>
                    <XAxis dataKey='time'/>
                    <YAxis dataKey='moodCount'/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='moodCount' fill={theme.palette.primary.main} />
                </BarChart>
                {/* </ResponsiveContainer> */}
                {/* <br /> */}
            </div>
            
        </ThemeProvider>
    )

}

export default MoodByTimeAllTime;