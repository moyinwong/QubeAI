import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './mainPage.css';

class MainPage extends Component {
    render() {
        return (
            <div className="mainPage">
                <p>Do you have a Rubik's Cube?</p>
                <Link to={'/scan'}>
                    <button id="yesBtn">Yes</button>
                </Link>
                <Link to={'/virtual'}>
                    <button id="noBtn">No</button>
                </Link>
            </div>
        )
    }
}

export default MainPage;