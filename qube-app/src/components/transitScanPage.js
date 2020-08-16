import React, { Component } from 'react';
import redirectWithTimer from './redirectWithTimer';
import './transitPage.css';

class TransitScanPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/scan', 2000);
    }
    render() {
        return (
            <div className="wholePage">
                <p>Great!  Ready to scan your cube.</p>
            </div>
        )
    }
}

export default TransitScanPage;