import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer } from 'recharts';
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



    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                {/* <ResponsiveContainer width='100%' height='100%'> */}
                    <AreaChart width={400} height={300} data={data}>
                        {/* <CartesianGrid /> */}
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Area type='monotone' dataKey='time' stroke='#1E7291' fill='#58A1C1' />
                    </AreaChart>
                {/* </ResponsiveContainer> */}
            </div>
        </ThemeProvider>
    )
}
export default MoodByTimeGraph;