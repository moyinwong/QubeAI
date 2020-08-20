import React, { Component } from 'react';
import { connect } from 'react-redux';
import camera from '../functions/camera';
import navBarAnimation from '../functions/navBarAnimation';
import { submitCube } from '../actions/submitCube';
import './scanPage.css';
// import {openCvReady} from '../functions/openCV/color-recognition'

class ScanPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation(1);
    }
    submitClick = async () => {
        const submittedValue = await camera();
        this.props.submitCube(submittedValue);
    }
    render() {
        return (
            <div className="scanPage">
                <video id="cam_input" height="480" width="640" style={{display: 'none'}} ref={function(){
                    window.openCamera()
                }}></video>
                <canvas id="canvasOutput"></canvas>
                <p id="sidesText"></p>
                <button id="scan" style={{fontSize: 40}}>scan</button>
                <button id="notations" style={{fontSize: 40}}>get all notations</button>
                <p id="sidesText" style={{fontSize: 40}}></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanPage);