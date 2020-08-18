import React, { Component } from 'react';
import { connect } from 'react-redux';
import virtualModel from '../functions/virtualModel';
import { submitCube } from '../actions/submitCube';
import './virtualPage.css';

// Components
import NavBar from './navBar';

class VirtualPage extends Component {
    submitClick = async () => {
        const submittedValue = virtualModel();
        this.props.submitCube(submittedValue);
    }
    render() {
        return (
            <div className="virtualPage">
                <NavBar />
                <p>Virtual Page</p>
                <button onClick={this.submitClick}>Submit Cube</button>
            </div>
        )
    }
}

// Connect to Redux Store
const mapStateToProps = (state) => {
    return { cubeValue: state.cubeValue };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitCube: (submittedValue) => {
            dispatch(submitCube(submittedValue));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VirtualPage);