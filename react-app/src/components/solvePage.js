import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation(3);
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

export default connect(mapStateToProps)(SolvePage);