import React from 'react';
import './Mood.css';
import WebByMoodGraph from './WebByMoodGraph.js';
import MoodsList from './MoodsList.js';
import TopMoodsPie from './TopMoodsPie';
import {
  getWebByMoodToday,
  getGraphableWebByMoodData,
  getMoodFrequencyToday,
  getOrderedMoods
} from '../../Data/WebsiteByMood';


// Main page for the data section but all the work is done in other files
class Mood extends React.Component {
  constructor(props) {
    super(props);
    // Mood frequencies
    const moodToday = getMoodFrequencyToday(props.moodLog);
    const moodAllTime = props.allTimeMood;
    // Top Moods Ordered (for moodsList buttons)
    const orderedMoodsToday = getOrderedMoods(moodToday);
    const orderedMoodsAllTime = getOrderedMoods(moodAllTime);

    // get webByMoodToday from moodLog and webLog
    var webByMoodToday = getWebByMoodToday(props.moodLog, props.webLog);
    // turn webByMoods into graphable form (objects in ordered list rather than dict)
    var webByMoodTodayGraphable = getGraphableWebByMoodData(webByMoodToday, 10);
    var webByMoodAllTimeGraphable = getGraphableWebByMoodData(props.allTimeWebByMood, 10);

    this.state = {
      currentMood: orderedMoodsToday[0],
      allTime: false,
      // orderedMoods (today, allTime, current one to use)
      orderedMoodsToday: orderedMoodsToday,
      orderedMoodsAllTime: orderedMoodsAllTime,
      orderedMoods: orderedMoodsToday,
      // moodData (today, allTime, current one to use)
      moodData: moodToday,
      moodToday: moodToday,
      moodAllTime: moodAllTime,
      // Graphable data (today, allTime, current one to use)
      // Note: initial graph is of top mood in data from today
      todayWebByMoodGraphable: webByMoodTodayGraphable,
      allTimeWebByMoodGraphable: webByMoodAllTimeGraphable,
      graphData: webByMoodTodayGraphable[orderedMoodsToday[0]],
      // Text
      buttonText: "View All Time",
      headerText: "Moods Today"
    };
    // Bind functions to this object so can use this object's state
    this.onCurrentMoodChange = this.onCurrentMoodChange.bind(this);
    this.switchTime = this.switchTime.bind(this);

  }
  // Switch Between All-time Data vs Today Data
  // Note when switching, currentMood gets reset to top mood for time period
  switchTime() {
    if (this.state.allTime === false) {
      // set to All Time
      this.setState({
        graphData: this.state.allTimeWebByMoodGraphable[this.state.orderedMoodsAllTime[0]],
        currentMood: this.state.orderedMoodsAllTime[0],
        moodData: this.state.moodAllTime,
        orderedMoods: this.state.orderedMoodsAllTime,
        allTime: true,
        buttonText: "View Today",
        headerText: "Moods All-Time"
      });
    } else {
      // set to Today
      this.setState({
        graphData: this.state.todayWebByMoodGraphable[this.state.orderedMoodsToday[0]],
        currentMood: this.state.orderedMoodsToday[0],
        moodData: this.state.moodToday,
        orderedMoods: this.state.orderedMoodsToday,
        allTime: false,
        buttonText: "View All Time",
        headerText: "Moods Today"
      });
    }
  }

  // switch current mood and data to display in graph
  onCurrentMoodChange(newMood) {
    if (this.state.allTime === false) {
      this.setState({ currentMood: newMood, graphData: this.state.todayWebByMoodGraphable[newMood] });
    } else {
      this.setState({ currentMood: newMood, graphData: this.state.allTimeWebByMoodGraphable[newMood] });
    }
  }
  render() {
    return (
      <div className='mood' >
        <h1>
          {this.state.headerText}
        </h1>
        <div><button onClick={this.switchTime} style={{ height: '30px', width: '100px' }}>{this.state.buttonText}</button></div>
        <div>
          <h3>
            {this.state.currentMood}
          </h3>
          <WebByMoodGraph currentMood={this.state.currentMood} graphData={this.state.graphData} />
        </div>
        <div>
          <MoodsList setCurrentMood={this.onCurrentMoodChange} orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodData}></MoodsList>
        </div>
        <div>
          <TopMoodsPie orderedMoods={this.state.orderedMoods} moodFrequency={this.state.moodData}></TopMoodsPie>
        </div>
      </div>
    )
  }
}
export default Mood;
