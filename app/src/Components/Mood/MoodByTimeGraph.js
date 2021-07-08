import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, Line, Legend, Scatter, ComposedChart, ReferenceLine } from 'recharts';
import { ThemeProvider, Card, Typography, CardContent } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter, VictoryArea, VictoryLabel, VictoryTooltip } from 'victory';
import Spline from 'cubic-spline';


function MoodByTimeGraph(props) {
 
    const [aSpline, setASpline] = useState(new Spline([0],[0]));
    const [moodScatter, setMoodScatter] = useState([]);
    const [firstPoint, setFirstPoint] = useState(0);
    const [lastPoint, setLastPoint] = useState(0);
    

    useEffect(() => {
        function getData(){

            var areaChartData = props.areaData;
            setASpline(areaChartData);


            var moodScatterData = props.scatterData;
            setMoodScatter(moodScatterData);

            var first = props.startStop[0];
            var last = props.startStop[1];

            setFirstPoint(first);
            setLastPoint(last);
            console.log(firstPoint, lastPoint)

        }
        getData();

    }, [props.areaData]);

    console.log(aSpline)
    console.log(firstPoint, lastPoint)

    const timeToInteger = (time) => {
        var t = time.split(':');
        for (var i = 0; i < t.length; i++) {
          t[i] = parseInt(t[i]);
        }
        const timeAsInt = ((t[0] * 3600) + (t[1] * 60) + t[2]);
        return (timeAsInt);
    }

    const integerToTime = (integer) => {
        let hrs = String(Math.floor(integer / 3600));
        let mins = String(Math.floor( (integer % 3600) / 60));
        let secs = String(Math.floor(integer % 60));

        if (secs < 10){
            secs = 0 + secs
        }

        const time = `${hrs}:${mins}:${secs}`;

        return (time);
    }


    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>

                <VictoryChart domain={{x: [7200, 79200], y: [0, 60]}} >
                    {/* <VictoryAxis tickValues={21600, 43200, 64800} tickFormat={['morning', 'afternoon', 'evening']} /> */}
                    <VictoryAxis standalone={false} tickValues={[21600, 43200, 68400]} tickFormat={['Morning', 'Afternoon', 'Evening']} />
                    <VictoryAxis standalone={false} dependentAxis label='Minutes Per Hour'/>
                    <VictoryArea 
                        samples={150}
                        y={(d) => ((d.x <= firstPoint || d.x >= lastPoint) ? 0: aSpline.at(d.x)/2)}
                     
                        style={{ data: { fill: "#58A1C1", fillOpacity: 0.7, stroke: '#58A1C1', strokeWidth: 2 } }}
                
                    />
                    <VictoryScatter
                        data={moodScatter}
                        size={5}
                        style={{ data: { fill: "#dd7c85" } }}
                        x={(data) => (data.time)}
                        y={(data) => aSpline.at(data.time)/2}
                        labels={({ datum }) => `${datum.mood} - ${integerToTime(datum.time)}`}
                        labelComponent={<VictoryTooltip  pointerLength={20} 
                        style={{fill: '#dd7c85'}}
                        flyoutStyle={{ fill: '#FFFFFF', stroke: '#dd7c85'}} />}
                    />
                    
                </VictoryChart>
        


            </div>
        </ThemeProvider>
    )
}
export default MoodByTimeGraph;