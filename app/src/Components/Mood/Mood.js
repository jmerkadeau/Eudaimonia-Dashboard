import React, { useState, useEffect } from 'react';
import './Mood.css';
import WebByMoodGraph from './WebByMoodGraph.js';
import MoodsList from './MoodsList.js';
import TopMoodsPie from './TopMoodsPie';
import { getDataForMood, getTopMoodsToday } from '../../Data/WebsiteByMood';


// Main page for the data section but all the work is done in other files
class Mood extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.moodLog);
    const [orderedMoods, moodFrequency] = getTopMoodsToday(props.moodLog);
    const moodData = getDataForMood(orderedMoods[0], props.moodLog, props.webLog);
    this.state = {
      currentMood: orderedMoods[0],
      moodLog: props.moodLog,
      webLog: props.webLog,
      orderedMoods: orderedMoods,
      moodFrequency: moodFrequency,
      moodData: moodData
    };
    this.onCurrentMoodChange = this.onCurrentMoodChange.bind(this);
  }

  onCurrentMoodChange(newMood) {
    // console.log(`onCurrentMoodChange Run ${newMood}`);
    const moodData = getDataForMood(newMood, this.state.moodLog, this.state.webLog);
    this.setState({ currentMood: newMood, moodData: moodData });
    // console.log(`state ${this.state.currentMood}`);
  }
  render() {
    return (
      <div className='mood' >
        <h1>
          Mood
          </h1>
        <div>
          <WebByMoodGraph currentMood={this.state.currentMood} moodData={this.state.moodData} />
        </div>
        <div>
          <MoodsList setCurrentMood={this.onCurrentMoodChange} orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodFrequency}></MoodsList>
        </div>
        <div>
          <TopMoodsPie orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodFrequency}></TopMoodsPie>
        </div>
      </div>
    )
  }
}
export default Mood;
