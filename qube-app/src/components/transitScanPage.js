import React, { Component } from 'react';
import './transitScanPage.css';

class TransitScanPage extends Component {
    componentDidMount(){
        setTimeout(() => { 
            this.props.history.push('/scan');
        }, 2000)
    }
    render() {
        return (
            <div className="wholePage" id="transitScanPage">
                <p>Great!  Ready to scan your cube.</p>
            </div>
        )
    }
}

export default TransitScanPage;