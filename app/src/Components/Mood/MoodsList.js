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



// I only imported the elements of recharts that I needed, there are a lot more you can use
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb",
    }
  }
});
const useStyles = makeStyles((theme) => ({
  mar: {
    margin: theme.spacing(0.5)
  },
  pad: {
    padding: theme.spacing(5),
    backgroundColor: '#0069d9',
  },
}));


export default function MoodsList(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  //
  const [allMoods, setAllMoods] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  //
  const handleClick = () => {
    console.info(`You clicked ${allMoods[selectedIndex]}`);
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

  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    const setMoodData = (e) => {
      const mood = e.target.className;
      props.setCurrentMood(mood);
      // console.log(mood);
      // const mood = e;
      // const a = await getMoodData(mood);
    };

    function createButtons() {
      // console.log("createButtons run");
      // var [orderedMoods, moodFrequency] = await getTopMoodsToday();
      const orderedMoods = props.orderedMoods;
      // const moodFrequency = props.moodFrequency;

      // console.log(typeof []);

      var allMoods = [
        'Anxious', 'Sad', 'Happy', 'Tired',
        'Energized', 'Frustrated', 'Calm',
        'Distracted', 'Focused', 'Lonely'
      ];
      allMoods = allMoods.filter((el) => !orderedMoods.includes(el));
      allMoods = orderedMoods.concat(allMoods);

      // allMoods is sorted by here
      setAllMoods(allMoods);

      // // console.log(allMoods);
      // // console.log(moodFrequency);
      // let buttonSet1 = document.getElementById('moodButtonSet');
      // var buttonSet = [];
      // for (var i = 0; i < allMoods.length; i++) {
      //   let newButton = document.createElement('button');
      //           // let newButton = React.createElement(Button, {variant: 'contained', color: 'primary', onClick: () => {setMoodData()}}, allMoods[i] + ": " + moodFrequency[allMoods[i]]);
      //   if (allMoods[i] in moodFrequency) {
      //     newButton.innerHTML = allMoods[i] + ": " + moodFrequency[allMoods[i]];
      //   } else {
      //     newButton.innerHTML = allMoods[i] + ": 0";
      //   }
      //         // buttonSet.push(newButton);
      //   buttonSet1.appendChild(newButton);
      //   newButton.addEventListener('click', setMoodData);
      //   newButton.className = allMoods[i];
      //   console.log(newButton.className);
      // }

      // const DivContainer = React.createElement('div', {}, buttonSet);

    }
    if (loading) {
      createButtons();
      setLoading(false);
    }
  }, []);
  // The empty array at the end of UseEffect makes it only run once
  // per render and only rerenders on state change.å
  const setMoodData = (e, mood) => {
    // console.log(mood)
    props.setCurrentMood(mood);
    // console.log(mood);
    // const mood = e;
    // const a = await getMoodData(mood);
  };
  const moodFrequency = props.moodFrequency;
  for (var i = 0; i < allMoods.length; i++) {
    if (moodFrequency[allMoods[i]] == undefined) {
      moodFrequency[allMoods[i]] = 0;
    }
  }


  // const classes = styles;
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.root}>
        {allMoods.map((option, index) => (
          <Button onClick={(event) => setMoodData(event, option)} variant='contained' color='primary' className={classes.mar}>
            {option + ": " + moodFrequency[option]}
          </Button>
        ))}
      </Container>
    </ThemeProvider>
  )
  // return (
  //   <ThemeProvider>
  //     <div>
  //       <div id='moodButtonSet'></div>
  //       {/* <DivContainer></DivContainer> */}
  //     </div><br/>
  //   </ThemeProvider>
  // )
}
// export default withStyles(styles, {withTheme: true })(MoodsList);
// export default MoodsList;