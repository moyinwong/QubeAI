import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navBarAnimation from '../functions/navBarAnimation';
import './welcomePage.css';

class WelcomePage extends Component {
    componentDidMount() {
        navBarAnimation(0);
    }
    render() {
        return (
            <div className="welcomePage">
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

export default WelcomePage;