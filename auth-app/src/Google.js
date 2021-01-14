import React, { Component } from 'react';
import "./Google.css"

class Google extends Component{
    render() {
        return(
            <div className="App">
                <button className="googleButton">
                    Sign in with Google
                </button>
            </div>
        );
    }
}

export default Google;