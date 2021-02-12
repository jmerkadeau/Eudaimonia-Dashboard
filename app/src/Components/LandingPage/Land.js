import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardActions, AppBar, Toolbar, useScrollTrigger, Slide } from '@material-ui/core';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import GSI from '../../GSI.png';
import { auth, database, provider } from '../../Data/Firebase.js';
import projectLogo from './../../projectLogo.png';
import TopBar from './TopBar.js';
import HideAppBar from './TopBar2.js';
import NewLanding from './NewLanding.js';
import Policy2 from './Policy2.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



export default function Land() {

  return (
    <div>
        <Router>
            <Switch>
                <Route path='/' exact component={() => <NewLanding />} />
                <Route path='/privacy' exact component={() => <Policy2 />} />
            </Switch>
        </Router>

    </div>
  );
}