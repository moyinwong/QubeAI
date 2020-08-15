import React, { Component } from 'react';
import './transitVirtualPage.css';

class TransitVirtualPage extends Component {
    componentDidMount(){
        setTimeout(() => { 
            this.props.history.push('virtual');
        }, 2000)
    }
    render() {
        return (
            <div className="transitVirtualPage">
                <p>It's fine.  Let's try our virtual cube.</p>
            </div>
        )
    }
}

export default TransitVirtualPage;