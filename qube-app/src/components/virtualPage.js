import React, { Component } from 'react';
import virtualModel from '../functions/virtualModel';
import './virtualPage.css';

// Components
import NavBar from './navBar';

class VirtualPage extends Component {
    render() {
        return (
            <div className="virtualPage">
                <NavBar />
                <p>Virtual Page</p>
            </div>
        )
    }
}

export default VirtualPage;