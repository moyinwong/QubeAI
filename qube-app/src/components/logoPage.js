import React, { Component } from 'react';
import redirectWithTimer from './redirectWithTimer';
import './logoPage.css';

class LogoPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/welcome', 2000);
    }
    render() {
        return (
            <div className="logoContainer">
                <img src={require('../pic/logo-ver-bg.png')} alt="Logo" />
            </div>
        )
    }
}

export default LogoPage;