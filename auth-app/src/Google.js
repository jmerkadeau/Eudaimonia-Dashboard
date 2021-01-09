import React, { Component } from 'react';
import "./Google.css"

class Google extends Component{
    render() {
        return(
            <div className="App">
                <button className="googleButton" onClick={this.props.googleSignIn} >
                    Sign in with Google
                </button>
            </div>
        );
    }
}

export default Google;