import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import showModalBox from '../functions/showModalBox';
import getCubeValue from '../functions/getCubeValue';
import { changeState } from '../actions/changeState';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("solve");
    }
    solveCube = async () => {
        if (this.props.currentState === "Cube submitted") {
            const valueToBeSubmitted = getCubeValue();
            const result = await axios.post("api/solveCube", valueToBeSubmitted);
            console.log(result.data);
        } else {
            showModalBox("notSupported");
        }
    }
    render() {
        return (
            <div className="solvePage">
                <button className="solveCube" onClick={this.solveCube}>Solve Cube</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage);