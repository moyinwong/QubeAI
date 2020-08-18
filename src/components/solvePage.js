import React, { Component } from 'react';
import './solvePage.css';

// Components
import NavBar from './navBar';

class SolvePage extends Component {
    render() {
        return (
            <div className="solvePage">
                <NavBar />
                <p>Solve Page</p>
            </div>
        )
    }
}

export default SolvePage;