import React, { Component } from "react";
import { connect } from "react-redux";
import navBarAnimation from "../functions/navBarAnimation";
//import virtualModel from '../functions/virtualModel';
import { changeState } from "../actions/changeState";
import "./virtualPage.css";

class VirtualPage extends Component {
  componentDidMount() {
    document.querySelector(".navBar").classList.remove("navBarHidden");
    navBarAnimation("virtual");
  }
  render() {
    return (
      <div className="virtualPage">
        <p>Virtual Page</p>
        <div id='canvasContainer'>
          <div id="canvasVirtual"></div>
        </div>
        {/* <script src="./three.js"></script>
        <script src="./OrbitControls.js"></script>

        <script src="./cube-util.js"></script>
        <script src="./cube-main.js"></script> */}
        <div className="btnContainerVer">
          <button>Submit Cube</button>
        </div>
      </div>
    );
  }
}

// Connect to Redux Store
const mapStateToProps = (state) => {
  return { currentState: state.currentState };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: (currentState) => {
      dispatch(changeState(currentState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualPage);
