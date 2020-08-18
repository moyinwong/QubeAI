import React, { Component } from 'react';
import { connect } from 'react-redux';
import navBarAnimation from '../functions/navBarAnimation';
import virtualModel from '../functions/virtualModel';
import { submitCube } from '../actions/submitCube';
import './virtualPage.css';

class VirtualPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').style.display = "flex";
        navBarAnimation("virtual");
    }
    submitClick = async () => {
        const submittedValue = virtualModel();
        this.props.submitCube(submittedValue);
    }
    render() {
        return (
            <div className="virtualPage">
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