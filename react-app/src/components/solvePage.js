import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import getCubeValue from '../functions/getCubeValue';
import { submitCube } from '../actions/submitCube';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation(3);
        const submittedValue = getCubeValue();
        this.props.submitCube(submittedValue);
        console.log(submittedValue);
    }
    solveCube = async () => {
        const result = await axios.post("/solveCube", this.props.cubeValue);
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
    return { cubeValue: state.cubeValue };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitCube: (submittedValue) => {
            dispatch(submitCube(submittedValue));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage);