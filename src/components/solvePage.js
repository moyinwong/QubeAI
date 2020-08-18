import React, { Component } from 'react';
import navBarAnimation from '../functions/navBarAnimation';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').style.display = "flex";
        navBarAnimation("solve");
    }
    render() {
        return (
            <div className="solvePage">
                <p>Solve Page</p>
            </div>
        )
    }
}

export default SolvePage;