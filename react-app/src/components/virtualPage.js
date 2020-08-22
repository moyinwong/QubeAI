import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import navBarAnimation from "../functions/navBarAnimation";
import showModalBox from "../functions/showModalBox";
import getCubeValue from "../functions/getCubeValue";
import { changeState } from "../actions/changeState";
import "./virtualPage.css";

class VirtualPage extends Component {
  constructor() {
    super();
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  componentDidMount() {
    document.querySelector(".navBar").classList.remove("navBarHidden");
    navBarAnimation("virtual");
  }
  solveCube = async () => {
    let cubeValue;

    if (this.props.currentState === "Cube scanned") {
      cubeValue = getCubeValue("scan");

      //   if (result.data === "Invalid input") {
      //     console.log("Invalid input");
      //   }

      //   if (result.data[0] == true) {
      //     moveCubeByList(result.data[0]);
      //   } else {
      //     console.log("Oh sorry! AI is not able to handle it! Good uck!");
      //   }
    } else {
      cubeValue = getCubeValue("virtual");
    }

    const result = await axios.post("api/solveCube", cubeValue);
    console.log(result.data);

    // Handle event when the A.I. failed to solve
    if (result === "Failed") {
      showModalBox("notSupported");
    }
  };
  render() {
    return (
      <div className="virtualPage">
        <div id="canvasContainer">
          <div id="canvasVirtual"></div>
        </div>
        <div
          ref={function () {
            window.threeStart();
          }}
        ></div>
        <div className="btnContainerVer">
          <button className="solveCube" onClick={this.solveCube}>
            Solve Cube
          </button>
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