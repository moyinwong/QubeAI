import React, { Component } from 'react';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation(3);
    }
    connectExpress = async () => {
        const result = await axios.get("http://localhost:8080/express");
        console.log(result);
    }
    render() {
        return (
            <div className="solvePage">
                <p>Solve Page</p>
                <button className="express" onClick={this.connectExpress}>Connect to Express</button>
            </div>
        )
    }
}

export default SolvePage;