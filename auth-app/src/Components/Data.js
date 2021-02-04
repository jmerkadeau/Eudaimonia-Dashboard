import React from 'react';
import './Data.css';
import WebByMoodGraph from './WebByMoodGraph.js';


// Main page for the data section but all the work is done in other files
function Data() {
  return(
    <div className='data'>
        <h1>
            Data
        </h1>
        <div>
          <WebByMoodGraph/>
        </div>
    </div>
  )
}
export default Data;
