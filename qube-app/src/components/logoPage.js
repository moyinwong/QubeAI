import React, { Component } from 'react';
import redirectWithTimer from './redirectWithTimer';
import './logoPage.css';

class LogoPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/main', 2000);
    }
    render() {
        return (
            <div className="wholePage" id="logoPage">
                <div className="logoContainer">
                    <img src={require('../pic/logo-ver-bg.png')} alt="Logo" />
                </div>
            </div>
        )
    }
}

export default LogoPage;