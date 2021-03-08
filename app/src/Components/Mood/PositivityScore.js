import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell, Sector, Label } from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// I only imported the elements of recharts that I needed, there are a lot more you can use

function PositivityScore(props) {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // console.log("useEffect run");
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.
    // I initially get Anxious and Focused just to have two graphs up to start.
    // It is an async/await function so that it waits until
    function getData() {
      // console.log("get Data run");
      // console.log(props.moodScore);
      // console.log(100 - props.moodScore);

      var pieChartData = [
        { name: "positive", value: props.moodScore },
        { name: "negative", value: 100 - props.moodScore }

      ];
      setPieData(pieChartData);

    }
    getData();
  }, [props.moodScore]);



  // const colors = ['#2961BC', '#2E6DD3', '#347AEB', '#4887ED', '#5C94EF', '#70A1F1',
  // '#85AFF3'];
  const colors = ['#4887ED', '#db6e8b'];
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#347aeb",
        light: "#3d7feb"
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <div>
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieData}
            cx={200}
            cy={150}
            innerRadius={80}
            outerRadius={100}
            fill="#347aeb">
            {pieData.map((entry, index) => (
              <Cell fill={colors[index]} />
            ))}
            <Label style={{ "font-size": 40 }} width={30} value={props.moodScore} position="center" />
          </Pie>
          {/* <Tooltip content={<CustomTooltip />}/> */}
          {/* <Tooltip /> */}

        </PieChart>
      </div>
    </ThemeProvider>
  )
}
export default PositivityScore;