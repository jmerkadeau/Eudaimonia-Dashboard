import React from 'react';
import './Web.css';
import TopMoodsPieByWeb from './TopMoodsPieByWeb';
import TopWebGraph from './TopWebGraph.js';
import { getWebData, getTimeByDomainToday, getTimeByDomainAllTime } from '../../Data/MoodByWebsite';


// Main page for the data section but all the work is done in other files
class Web extends React.Component {
  constructor(props) {
    super(props);
    const todayMoodByWeb = getWebData(props.moodLog, props.webLog);
    const todayTopSites = getTimeByDomainToday(props.webLog);
    const allTimeTopSites = getTimeByDomainAllTime(props.allTimeWeb);
    this.state = {
      // currentSite
      currentSite: todayTopSites[0].name,
      // allTime Toggle
      allTime: false,
      // topSites (today, allTime, which one)
      todayTopSites: todayTopSites,
      allTimeTopSites: allTimeTopSites,
      topSites: todayTopSites,
      // moodByWeb (today, allTime, which one)
      todayMoodByWeb: todayMoodByWeb,
      allTimeMoodByWeb: props.allTimeMoodByWeb,
      graphData: todayMoodByWeb,
      // Texts
      buttonText: "View All Time",
      headerText: "Web Today"
    };
    // Bind functions to this object so can use this object's state
    this.setCurrentSite = this.setCurrentSite.bind(this);
    this.switchTime = this.switchTime.bind(this);

  }
  // Set current site to display in graph
  setCurrentSite(domain) {
    this.setState({ currentSite: domain });
  }

  // Switch Between All-time Data vs Today Data
  switchTime() {
    if (this.state.allTime === false) {
      // set to All Time
      this.setState({
        graphData: this.state.allTimeMoodByWeb,
        topSites: this.state.allTimeTopSites,
        allTime: true,
        buttonText: "View Today",
        headerText: "Web All-Time"
      });
    } else {
      // set to Today
      this.setState({
        graphData: this.state.todayMoodByWeb,
        topSites: this.state.todayTopSites,
        allTime: false,
        buttonText: "View All Time",
        headerText: "Web Today"
      });
    }
  }
  render() {
    return (
      <div className='web' >
        <h1>{this.state.headerText}</h1>
        <div>
          <div><button onClick={this.switchTime} style={{ height: '30px', width: '100px' }}>{this.state.buttonText}</button></div>
          <TopWebGraph topSites={this.state.topSites} setSite={this.setCurrentSite} />
        </div>
        <div>
          <h3>
            {this.state.currentSite}
          </h3>
          <TopMoodsPieByWeb currentSite={this.state.currentSite} moodByWebData={this.state.graphData}></TopMoodsPieByWeb>
        </div>
      </div>
    )
  }
}
export default Web;
