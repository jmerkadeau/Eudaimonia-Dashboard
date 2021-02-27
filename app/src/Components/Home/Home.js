import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from '../Profile/Profile.js';
import Mood from '../Mood/Mood.js';
import Web from '../Web/Web.js';
import Nav from '../Nav/Nav.js';

import getMoodLog from '../../Data/MoodData.js';
import getWebLog from '../../Data/WebData.js';
import { getAllTimeWebByMood, getAllTimeMoodByWeb, getAllTimeMood, getAllTimeWeb } from '../../Data/AllTimeData.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moodLog: [], webLog: [], isLoading: true, allTimeWebByMood: {}, allTimeMoodByWeb: {} };
  }

  async componentDidMount() {
    const moodLog = await getMoodLog();
    const webLog = await getWebLog();
    const allTimeWebByMood = await getAllTimeWebByMood();
    const allTimeMoodByWeb = await getAllTimeMoodByWeb();
    const allTimeMood = await getAllTimeMood();
    const allTimeWeb = await getAllTimeWeb();
    // console.log(allTimeWeb);
    // console.log(allTimeMood);
    this.setState({
      moodLog: moodLog,
      webLog: webLog,
      allTimeWebByMood: allTimeWebByMood,
      allTimeMoodByWeb: allTimeMoodByWeb,
      allTimeMood: allTimeMood,
      allTimeWeb: allTimeWeb,
      isLoading: false
    });
  }

  render() {

    return (
      // Uses react-router-dom to allow the user to go between Profile and Data
      // User is automatically sent to Profile when logged in
      // I don't think Router and Switch are both necessary but I haven't messed
      // around with them
      this.state.isLoading ?
        <div></div>
        :
        <div className='home'>
          <Router>
            <Nav />
            {/* <Switch> */}
            <Route path='/dashboard' exact component={() => <Profile />} />
            <Route path='/dashboard/mood' exact component={() => <Mood webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeMood={this.state.allTimeMood} allTimeWebByMood={this.state.allTimeWebByMood} />} />
            <Route path='/dashboard/web' exact component={() => <Web webLog={this.state.webLog} moodLog={this.state.moodLog} allTimeWeb={this.state.allTimeWeb} allTimeMoodByWeb={this.state.allTimeMoodByWeb} />} />


            {/* </Switch> */}
          </Router>

        </div>
    )
  }
}

export default Home;