import React, { useState, useEffect } from 'react';
import './Web.css';
// import WebByMoodGraph from './WebByMoodGraph.js';
// import MoodsList from './MoodsList.js';
import TopMoodsPieByWeb from './TopMoodsPieByWeb';
import TopWebGraph from './TopWebGraph.js';
import { getWebData } from '../../Data/MoodByWebsite';


// Main page for the data section but all the work is done in other files
class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSite: "", topSitesState: [], moodByWebData: [] };
    this.setCurrentSite = this.setCurrentSite.bind(this);
  }
  // const[currentMood, setCurrentMoodState] = useState("Frustrated");
  async componentDidMount() {
    const [topSites, moodByWebData] = await getWebData();
    // console.log(topSites);
    this.setState({
      currentSite: topSites[0].name,
      topSitesState: topSites,
      moodByWebData: moodByWebData
    });
    // console.log(`state ${this.state.moodByWebData}`);
  }

  setCurrentSite(domain) {
    console.log(`onCurrentMoodChange Run ${domain}`);
    this.setState({ currentSite: domain });
    // console.log(`state ${this.state.currentMood}`);
  }
  render() {
    // var thisMood = this.state.currentMood;
    return (
      <div className='web' >
        <h1>
          Web Data
          </h1>
        <div>
          <TopWebGraph topSites={this.state.topSitesState} setSite={this.setCurrentSite} />
        </div>
        <div>
          <TopMoodsPieByWeb currentSite={this.state.currentSite} moodByWebData={this.state.moodByWebData}></TopMoodsPieByWeb>
        </div>
      </div>
    )
  }
}
export default Web;
