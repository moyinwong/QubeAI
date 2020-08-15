import React, { Component } from 'react';
import './logoPage.css';

class LogoPage extends Component {
    componentDidMount(){
        setTimeout(() => { 
            this.props.history.push('/main');
        }, 2000)
    }
    render() {
        return (
            <div className="logoPage">
                <div className="logoContainer">
                    <img src={require('../pic/logo-ver-bg.png')} alt="Logo" />
                </div>
            </div>
        )
    }
}

export default LogoPage;