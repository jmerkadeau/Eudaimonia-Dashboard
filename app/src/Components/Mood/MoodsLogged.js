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
    root: {   
    }
}));

export default function MoodsLogged(){
    const classes = useStyles();
    
} 