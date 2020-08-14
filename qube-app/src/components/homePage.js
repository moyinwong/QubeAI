import React, { Component } from 'react';
import './homePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="homePage">
                <div className="logoContainer">
                    <img src={require('../pic/logo-ver-bg.png')} alt="Logo" />
                </div>
            </div>
        )
    }
}

export default HomePage;