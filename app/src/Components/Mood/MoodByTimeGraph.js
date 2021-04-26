import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Line, Legend, Scatter, ComposedChart } from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';

function MoodByTimeGraph(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        function getData(){

            var areaChartData = props.areaData;

            setData(areaChartData)

        }
        getData();
    }, [props.areaData]);
    console.log(data);

    let moodsToday = [
        {'name': 30000, 'time': 40, 'period': 'Tired' },
        {'name': 30400, 'time': 40, 'period': 'Energized' },
        {'name': 45900, 'time': 40, 'period': 'Distracted' },
        {'name': 65580, 'time': 40, 'period': 'Focused' },
    ];



    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                {/* <ResponsiveContainer width='100%' height='100%'> */}
                    {/* <AreaChart width={400} height={300} data={data}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Area type='monotone' dataKey='time' stroke='#1E7291' fill='#58A1C1' />
                        <Scatter data={moodsToday} dataKey='time' fill='#dd7c85' />
                    </AreaChart> */}
                    <ComposedChart width={400} height={300} data={data}>
                        {/* <XAxis dataKey='name' /> */}
                        <XAxis dataKey='name' type='number' domain={[0, 86400]}/>
                        <YAxis domain={[0, 'auto']}/>
                        <Tooltip />
                        <Area type='monotone' dataKey='time' stroke='#1E7291' fill='#58A1C1' />
                        {/* <Line type='monotone' dataKey='moodTime' stroke='#dd7c85' /> */}
                        <Scatter dataKey='moodTime' fill='#dd7c85' />

                    </ComposedChart>
                {/* </ResponsiveContainer> */}
            </div>
        </ThemeProvider>
    )
}
export default MoodByTimeGraph;