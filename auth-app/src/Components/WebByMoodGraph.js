import React from 'react';
import { timeByDom } from './WebsiteByMood.js'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function WebByMoodGraph() {
    const data = timeByDom;

    return(
        <div>
            <h3>
                Mood: Anxious
            </h3>
            <BarChart width={500} height={500} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="seconds" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default WebByMoodGraph;