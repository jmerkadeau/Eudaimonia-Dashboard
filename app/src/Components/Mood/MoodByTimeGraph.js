import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Line, Legend, Scatter, ComposedChart, ReferenceLine } from 'recharts';
import { ThemeProvider, Card, Typography, CardContent } from '@material-ui/core';
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

    const CustomizedAxisTick = (tick) => {
        
        let newTick = 'time';
        if (tick==21600){
            newTick = 'Morning'
        }
        else if(tick==43200){
            newTick='Afternoon'
        }
        // else if (tick==36000){
        //     newTick='10:00 AM'
        // }
        // else if (tick==50400){
        //     newTick='2:00 PM'
        // }
        else if (tick==64800){
            newTick='Evening'
        }
        return(newTick);
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">{`${payload[0].payload.label} : ${payload[0].payload.period}`}</p>
            </div>
          );
        }
      
        return null;
      };



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
                        
                        <XAxis dataKey='name' type='number' height={60} angle={30} textAnchor='start' ticks={[21600, 43200, 64800]} domain={[7200, 79200]} tickFormatter={CustomizedAxisTick}/>
                        {/* tickFormatter={CustomizedAxisTick} */}
                        {/* <YAxis domain={[0, 'auto']}/> */}

                        <Tooltip content={<CustomTooltip />}/>
                        <Area type='monotone' dataKey='time' stroke='#1E7291' fill='#58A1C1' />
                        {
                            data.map((id) => {
                            return (<Line type='stepBefore' dataKey='moodTime' stroke='#dd7c85' connectNulls='False'/>)
                            })
                        }
                        {/* <Line type='monotone' dataKey='moodTime' stroke='#dd7c85' /> */}

                        <Scatter dataKey='moodTime' fill='#dd7c85' />

                        

                    </ComposedChart>
                {/* </ResponsiveContainer> */}
            </div>
        </ThemeProvider>
    )
}
export default MoodByTimeGraph;