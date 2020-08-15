import React, { Component } from 'react';
import redirectWithTimer from './redirectWithTimer';
import './transitScanPage.css';

class TransitScanPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/scan', 2000);
    }
    render() {
        return (
            <div className="wholePage" id="transitScanPage">
                <div className="backGroundCover"></div>
                <p>Great!  Ready to scan your cube.</p>
            </div>
        )
    }
}

export default TransitScanPage;