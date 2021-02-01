import React, { Component, useState, useEffect } from 'react';
import { getAnxious, getConfident, getSad, getHappy } from './WebsiteByMood.js'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function WebByMoodGraph() {

    const [ loading, setLoading ] = useState(true)
    const [ data1, setData1 ] = useState([])
    const [ data2, setData2 ] = useState([])

    useEffect(() => {
        async function getData() {
            const anxious = await getAnxious();
            const confident = await getConfident();
            const sad = await getSad();
            const happy = await getHappy();
            console.log(anxious);
            setData1(anxious);
            setData2(sad);
            setLoading(false)
        }
        if (loading) {
            getData();
        }
    }, []);


    return(
        <div>
            <h3>
                Mood: Anxious
            </h3>
            <BarChart width={800} height={500} data={data1} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="seconds" fill="#8884d8" />
            </BarChart>
            <h3>
                Mood: Confident
            </h3>
            <BarChart width={800} height={500} data={data2} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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

// class WebByMoodGraph extends Component {
//     constructor() {
//         super();
//         this.state = {
//             data: []
//         };
//         const anxious = getAnxious();
//         this.setState({data:anxious});
//         console.log(anxious);
//         console.log(this.setState.data);
//     }

//     render(){
//         return(
//             <div>
//                 <h3>
//                     Mood: Anxious
//                 </h3>
//                 <BarChart width={500} height={500} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis/>
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="seconds" fill="#8884d8" />
//                 </BarChart>
//             </div>
//         )
//     }
// }
export default WebByMoodGraph;