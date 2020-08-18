import React, { Component } from 'react';
import { connect } from 'react-redux';
import camera from '../functions/camera';
import { submitCube } from '../actions/submitCube';
import './scanPage.css';

// Components
import NavBar from './navBar';

class ScanPage extends Component {
    submitClick = async () => {
        const submittedValue = await camera();
        this.props.submitCube(submittedValue);
    }
    render() {
        return (
            <div className="scanPage">
                <NavBar />
                <button onClick={this.submitClick}>Scan Cube</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanPage);