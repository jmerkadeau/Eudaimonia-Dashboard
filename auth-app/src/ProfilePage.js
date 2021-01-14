import React, { Component } from 'react';
import './ProfilePage.css';

class ProfilePage extends Component{
    render() {
        return(
            <div className="outer">
            <div className="inner">
                <div className="profPic">
                </div>
                <div className="bio">
                    <h2>
                        Joseph Merkadeau
                    </h2>
                    <h3>
                        jmerkadeau@gmail.com
                    </h3>
                </div>
            </div>
            <button>
                Sign Out
            </button>
        </div>

        );
    }

}


export default ProfilePage;