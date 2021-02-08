import React, { useState, useEffect } from 'react';
import './Mood.css';
import WebByMoodGraph from './WebByMoodGraph.js';
import MoodsList from './MoodsList.js';
import TopMoodsPie from './TopMoodsPie'


// Main page for the data section but all the work is done in other files
class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentMood: "Frustrated" };
    this.onCurrentMoodChange = this.onCurrentMoodChange.bind(this);
  }
  // const[currentMood, setCurrentMoodState] = useState("Frustrated");


  onCurrentMoodChange(newMood) {
    // console.log(`onCurrentMoodChange Run ${newMood}`);
    this.setState({ currentMood: newMood });
    // console.log(`state ${this.state.currentMood}`);
  }
  render() {
    // var thisMood = this.state.currentMood;
    return (
      <div className='mood' >
        <h1>
          Mood
          </h1>
        <div>
          <WebByMoodGraph currentMood={this.state.currentMood} />
        </div>
        <div>
          <MoodsList setCurrentMood={this.onCurrentMoodChange}></MoodsList>
        </div>
        <div>
          <TopMoodsPie></TopMoodsPie>
        </div>
      </div>
    )
  }
}
export default Mood;
