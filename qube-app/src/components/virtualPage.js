import React, { Component } from 'react';
import './virtualPage.css';

// Components
import NavBar from './navBar';

class VirtualPage extends Component {
    render() {
        return (
            <div className="wholePage" id="virtualPage">
                <NavBar />
                <p>Virtual Page</p>
            </div>
        )
    }
}

export default VirtualPage;