import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from '../Profile/Profile.js';
import Mood from '../Mood/Mood.js';
import Web from '../Web/Web.js';
import Nav from '../Nav/Nav.js';

import getMoodLog from '../../Data/MoodData.js';
import getWebLog from '../../Data/WebData.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moodLog: [], webLog: [], isLoading: true };
  }

  async componentDidMount() {
    const moodLog = await getMoodLog();
    const webLog = await getWebLog();
    // console.log(moodLog);
    this.setState({
      moodLog: moodLog,
      webLog: webLog,
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
              <Route path='/dashboard/mood' exact component={() => <Mood webLog={this.state.webLog} moodLog={this.state.moodLog} />} />
              <Route path='/dashboard/web' exact component={() => <Web webLog={this.state.webLog} moodLog={this.state.moodLog} />} />


            {/* </Switch> */}
          </Router>

        </div>
    )
  }
}

export default Home;