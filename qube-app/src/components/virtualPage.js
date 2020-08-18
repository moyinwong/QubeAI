import React, { Component } from 'react';
import { connect } from 'react-redux';
import virtualModel from '../functions/virtualModel';
import './virtualPage.css';

// Components
import NavBar from './navBar';

class VirtualPage extends Component {
    // Testing
    componentDidMount = () => {
        console.log(this.props.cubeValue);
    }
    render() {
        return (
            <div className="virtualPage">
                <NavBar />
                <p>Virtual Page</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { cubeValue: state.cubeValue };
}

export default connect(mapStateToProps)(VirtualPage);