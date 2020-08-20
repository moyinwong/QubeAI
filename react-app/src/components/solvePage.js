import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import navBarAnimation from '../functions/navBarAnimation';
import getCubeValue from '../functions/getCubeValue';
import { changePage } from '../actions/changePage';
import './solvePage.css';

class SolvePage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("solve");
        this.props.changePage("solve");
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
    return { currentPage: state.currentPage };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (currentPage) => {
            dispatch(changePage(currentPage));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvePage);