import React, { Component } from 'react';
import { connect } from 'react-redux';
import navBarAnimation from '../functions/navBarAnimation';
import showModalBox from '../functions/showModalBox';
import { changeState } from '../actions/changeState';
import './scanPage.css';

class ScanPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("scan");
    }
    submitCube = () => {
        const sidesText = document.querySelector('#sidesText');
        if (sidesText.innerHTML === "scanned sides: 1/6") {
            this.props.changeState("Cube submitted");
            console.log(this.props.currentState);
            showModalBox("scanSuccessfully");
        } else {
            showModalBox("pleaseScan");
        }
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
                    <button id="notations" onClick={this.submitCube}>Submit Cube</button>
                </div>
            </div>
        )
    }
}

// Connect to Redux Store
const mapStateToProps = (state) => {
    return { currentState: state.currentState };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: (currentState) => {
            dispatch(changeState(currentState));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanPage);