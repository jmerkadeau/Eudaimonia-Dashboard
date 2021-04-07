import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Tooltip, Cell
} from 'recharts';
import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Grid, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
// I only imported the elements of recharts that I needed, there are a lot more you can use


const useStyles = makeStyles((theme) => ({
  content: {
    overflow: 'auto'
  },
  rightAlign: {
    justifyContent: 'flex-start',
    color: theme.palette.common.white,
    border: 'none',
    backgroundColor: '#74b0cb'
  },
  group: {
    color: theme.palette.secondary.main
  },
  color: {
    color: '#74b0cb'
  }
}));

function processURL(name) {
  if (name.includes('www.')) {
    name = name.replace('www.', '');
  }
  if (name.length > 22) {
    name = name.slice(0, 20);
    name = name.concat("..");
  }
  return name;
}

function TopMoodsPieByWeb(props) {
  const [pieData, setPieData] = useState([]);
  const [data, setData] = useState([]);
  const [dataKey, setDataKey] = useState("minutes");



  useEffect(() => {
    const setCurrentSite = (e, site) => {
      // const site = e.target.id;
      props.setSite(site);
    };
    // This function is where WebsiteByMood.js is called to collect the data
    // we need for the graphs.

    // compare function to order items in pieData
    function compare(a, b) {
      const timeA = a.value;
      const timeB = b.value;

      let comparison = 0;
      if (timeA > timeB) {
        comparison = -1;
      }
      else if (timeA < timeB) {
        comparison = 1;
      }
      return comparison;
    }





    function createPieChartData() {
      // console.log("[topMoodsPieByWeb] createPieChartData run");
      const currentSite = props.currentSite.replaceAll('.', '%2E');
      const moodByWebData = props.moodByWebData;
      if (currentSite in moodByWebData) {
        const temp = moodByWebData[currentSite];
        var pieChartData = [];
        for (var key in temp) {
          pieChartData.push({
            name: processURL(key),
            value: temp[key]
          });
        }
        pieChartData.sort(compare);
        setPieData(pieChartData);
      } else {
        console.log("No moods associated with site from today");
        setPieData([]);
      }

    }

    // console.log(props);
    var topSitesShortened = [];
    if (!props.allTime) {
      props.topSites.forEach(function (item, index) {
        topSitesShortened.push({
          name: item.name,
          value: Math.round(item.seconds / 60)
        });
      });
      setDataKey('min');

    } else {
      props.topSites.forEach(function (item, index) {
        topSitesShortened.push({
          name: item.name,
          value: (item.seconds / 3600).toFixed(1)
        });
      });
      setDataKey('hrs');
    }

    // console.log(topSitesShortened);
    setData(topSitesShortened);

    // setData(props.topSites);
    createPieChartData();
  }, [props]);
  // }, [props.moodByWebData, props.currentSite]);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.

  let colors = []
  const fullColors = ['#265366', '#2d6279', '#34718b', '#3b809e', '#428fb1', '#58a1c1', '#61a6c4', '#74b0cb', '#86bbd2', '#99c5d9'];
  if (pieData.length <= 2) {
    colors = [fullColors[5], fullColors[7]];
  }
  else if (pieData.length > 2 && pieData.length <= 4) {
    colors = [fullColors[3], fullColors[4], fullColors[5], fullColors[7]]
  }
  else if (pieData.length > 4 && pieData.length <= 6) {
    colors = [fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[7], fullColors[8]]
  }
  else if (pieData.length > 6 && pieData.length <= 8) {
    colors = [fullColors[1], fullColors[2], fullColors[3], fullColors[4], fullColors[5], fullColors[6], fullColors[7], fullColors[8]]
  }
  else {
    colors = fullColors;
  }

  let renderLabel = function (entry) {
    return entry.name;
  }

  // const setWebData = (e, web) => {
  //   props.setSite(web)
  // }
  const setCurrentSite = (e, site) => {
    // const site = e.target.id;
    props.setSite(site);
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="webButtonSet2">
        <ButtonGroup orientation='vertical' variant='contained' color='primary' >
          {data.map((x, i) => (
            <Button onClick={(event) => { setCurrentSite(event, x.name) }} id={x.name} className={classes.rightAlign}>
              {processURL(x.name)} - {x.value} {dataKey}
            </Button>
          ))}
        </ButtonGroup>

      </div>
      <div className={classes.content}>
        <PieChart width={400} height={400} margin={{ top: 0, right: 0, left: 50, bottom: 0 }}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={pieData}
            // cx={200}
            // cy={150}
            outerRadius={125}
            label={renderLabel}>
            {pieData.map((entry, index) => (
              <Cell fill={colors[index]} />
            ))}

          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </ThemeProvider>
  )
}
export default TopMoodsPieByWeb;