import React, { Component } from 'react';
import './scanPage.css';

// Components
import NavBar from './navBar';

class ScanPage extends Component {
    render() {
        return (
            <div className="scanPage">
                <NavBar />
                <p>Scan Page</p>
            </div>
        )
    }
}

export default ScanPage;