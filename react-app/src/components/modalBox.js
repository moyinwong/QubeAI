import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import showModalBox from '../functions/showModalBox';
import './modalBox.css';

class ModalBox extends Component {
    closeModalBox = () => {
        showModalBox("none");
    }
    render() {
        return (
            <div className="modalBox">
                <div className="darkScreen" onClick={this.closeModalBox}></div>
                <div className="modalBoxContent">
                    <div className="modalElements" id="modalScanSuccessfully">
                        <p className="modalDescriptions">Would you like our A.I. to SOLVE it for you?</p>
                        <div className="btnContainerHor">
                            <Link to={'/virtual'} onClick={this.closeModalBox}>
                                <button>Yes</button>
                            </Link>
                        </div>
                    </div>
                    <div className="modalElements" id="modalPleaseScan">
                        <p className="modalDescriptions">Please scan all the sides before submission.</p>
                    </div>
                    <div className="modalElements" id="modalNotSupported">
                        <p className="modalDescriptions">This Cube is too complicated.  Please scan or try another one.</p>
                        <div className="btnContainerHor">
                            <Link to={'/scan'} onClick={this.closeModalBox}>
                                <button>Scan Cube</button>
                            </Link>
                            <button onClick={this.closeModalBox}>Go Virtual</button>
                        </div>
                    </div>
                    <div className="modalElements" id="modalInvalid">
                        <p className="modalDescriptions">The input is invalid.  Please scan or try another one.</p>
                        <div className="btnContainerHor">
                            <Link to={'/scan'} onClick={this.closeModalBox}>
                                <button>Scan Cube</button>
                            </Link>
                            <button onClick={this.closeModalBox}>Go Virtual</button>
                        </div>
                    </div>
                    <div className="modalElements" id="modalSolved">
                        <p className="modalDescriptions">Our A.I. has solved the Cube SUCCESSFULLY. Click to see how it solves the Cube.</p>
                        <div className="btnContainerHor">
                            <button onClick={this.closeModalBox}>See Results</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalBox;