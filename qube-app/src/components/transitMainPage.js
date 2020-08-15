import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './mainPage.css';

class TransitMainPage extends Component {
    render() {
        return (
            <div className="wholePage" id="mainPage">
                <div className="backGroundCover"></div>
                    <p>Do you have a Rubik's Cube with you?</p>
                    <Link to={'/transitScan'}>
                        <button id="yesBtn">Yes</button>
                    </Link>
                    <Link to={'/transitVirtual'}>
                        <button id="noBtn">No</button>
                    </Link>
            </div>
        )
    }
}

export default TransitMainPage;