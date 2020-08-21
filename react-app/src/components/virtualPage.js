import React, { Component } from 'react';
import { connect } from 'react-redux';
import navBarAnimation from '../functions/navBarAnimation';
import virtualModel from '../functions/virtualModel';
import { changeStage} from '../actions/changeState';
import './virtualPage.css';

class VirtualPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("virtual");
    }
    render() {
        return (
            <div className="virtualPage">
                <p>Virtual Page</p>
                <div className="canvas" id="canvas">Canvas</div>
                <div className="btnContainerVer">
                    <button>Submit Cube</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(VirtualPage);