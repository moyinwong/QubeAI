import React, { Component } from 'react';
import redirectWithTimer from '../functions/redirectWithTimer';
import './logoPage.css';

class LogoPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.add('navBarHidden');
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