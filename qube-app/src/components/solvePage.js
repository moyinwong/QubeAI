import React, { Component } from 'react';
import './solvePage.css';

class SolvePage extends Component {
    componentWillMount() {
        document.querySelector('.navBar').style.display = "flex";
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