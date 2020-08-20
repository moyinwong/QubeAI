import React, { Component } from 'react';
import { connect } from 'react-redux';
import navBarAnimation from '../functions/navBarAnimation';
import { changeStage } from '../actions/changeState';
import './scanPage.css';
// import {openCvReady} from '../functions/openCV/color-recognition'

class ScanPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("scan");
    }
    render() {
        return (
            <div className="scanPage">
                <video id="cam_input" height="480" width="640" ref={function () {
                    window.openCamera()
                }}></video>
                <canvas id="canvasOutput"></canvas>
                <div className="highLightedText">
                    <p id="sidesText"></p>
                </div>
                <div className="btnContainerHor">
                    <button id="scan">Scan Side</button>
                    <button id="notations">Submit Cube</button>
                </div>
            </div>
        )
    }
}

// Connect to Redux Store
const mapStateToProps = (state) => {
    return { currentStage: state.currentStage };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStage: (currentStage) => {
            dispatch(changeStage(currentStage));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanPage);