import React, { Component } from 'react';
import redirectWithTimer from '../functions/redirectWithTimer';

class TransitScanPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/scan', 2000);
    }
    render() {
        return (
            <div>
                <p>Great!  Ready to scan your cube.</p>
            </div>
        )
    }
}

export default TransitScanPage;