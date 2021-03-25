import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Button, Grid, ButtonGroup, Paper, Popper, MenuItem, MenuList, Grow, Container } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';



// I only imported the elements of recharts that I needed, there are a lot more you can use

const useStyles = makeStyles((theme) => ({
  mar: {
    // margin: theme.spacing(0.5)
  },
  pad: {
    padding: theme.spacing(5),
    backgroundColor: '#0069d9',
  },
  bg: {
    marginTop: theme.spacing(8),
  }
}));


export default function WebList(props) {
  const classes = useStyles();

  // const [loading, setLoading] = useState(true);
  // const [selected, setSelected] = useState(0);
  const [selected, setSelected] = useState('outlined');

  //
  const [allWebs, setAllWebs] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  //
  const handleClick = () => {
    console.info(`You clicked ${allWebs[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const selectThis = (i) => {
    setSelected('contained');
  }

  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    const setWebsite = (e) => {
      const web = e.target.className;
      props.setSite(web);
    };

    function createButtons() {
      // console.log("createButtons run");
      // var [orderedMoods, moodFrequency] = await getTopMoodsToday();
      const topSites = props.topSites;
      console.log(topSites);
      // const moodFrequency = props.moodFrequency;

      // console.log(typeof []);

      // let allWebs = [];
      // allWebs = allWebs.filter((el) => !topSites.includes(el));
      // allWebs = topSites.concat(allWebs);

      // allMoods is sorted by here
      setAllWebs(topSites);
      console.log(allWebs);
      // {allWebs.map((option, index) => (
      //   console.log(option);
      //   console.log(index);
      // ))}

    }
    createButtons();
    // console.log("[MoodsList] useEffect Run");

  }, [props]);

  const setWebsite = (e, web) => {
    // console.log(mood)
    props.setSite(web);
    console.log(e);
    console.log(web);
  };

  // const webFrequency = props.webFrequency;
  // for (var i = 0; i < allWebs.length; i++) {
  //   if (webFrequency[allWebs[i]] == undefined) {
  //     webFrequency[allWebs[i]] = 0;
  //   }
  // }


  const topSites = props.topSites;

  // const classes = styles;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.bg}>
        {/* {topSites.map((option, index) => (
          <div>{option}</div>
        ))} */}
        {/* <ButtonGroup orientation='vertical' color='primary' variant='outlined'>
          {allWebs.map((option, index) => (
            <Button onClick={(event) => { setWebsite(event, option); selectThis(); }} variant='outlined' color='primary' className={classes.mar} id={index}>
              {option}
            </Button>
          ))}
        </ButtonGroup> */}
      </div>
    </ThemeProvider>
  )

}
