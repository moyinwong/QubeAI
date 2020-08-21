import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navBarAnimation from '../functions/navBarAnimation';
import './welcomePage.css';

class WelcomePage extends Component {
    componentDidMount() {
        navBarAnimation("welcome");
    }
    render() {
        return (
            <div className="welcomePage">
                <p>Do you have a Rubik's Cube with you?</p>
                <div className="btnContainerVer">
                    <Link to={'/transitScan'}>
                        <button id="yesBtn">Yes</button>
                    </Link>
                    <Link to={'/transitVirtual'}>
                        <button id="noBtn">No</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default WelcomePage;