import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import getCubeValue from '../functions/getCubeValue';
import { changeStage } from '../actions/changeState';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("solve");
    }
    solveCube = async () => {
        const valueToBeSubmitted = getCubeValue();
        const result = await axios.post("/solveCube", valueToBeSubmitted);
        console.log(result.data);
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
    return { currentStage: state.currentStage };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeStage: (currentStage) => {
            dispatch(changeStage(currentStage));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage);