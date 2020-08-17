import React, { Component } from 'react';
import redirectWithTimer from './redirectWithTimer';
import './transitPage.css';

class TransitVirtualPage extends Component {
    componentDidMount() {
        redirectWithTimer(this.props, '/virtual', 2000);
    }
    render() {
        return (
            <div>
                <p>It's fine.  Let's try our virtual cube.</p>
            </div>
        )
    }
}

export default TransitVirtualPage;