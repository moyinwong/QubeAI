import React, { Component } from 'react';
import './mainPage.css';

class MainPage extends Component {
    render() {
        return (
            <div className="mainPage">
                <p>Do you have a Rubik's Cube?</p>
                <button id="yesBtn">Yes</button>
                <button id="noBtn">No</button>
            </div>
        )
    }
}

export default MainPage;