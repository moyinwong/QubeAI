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
                            <Link to={'/solve'} onClick={this.closeModalBox}>
                                <button>Yes</button>
                            </Link>
                        </div>
                    </div>
                    <div className="modalElements" id="modalPleaseScan">
                        <p className="modalDescriptions">Please scan all the sides before submission.</p>
                    </div>
                    <div className="modalElements" id="modalNotSubmitted">
                        <p className="modalDescriptions">Please SCAN or try our VIRTUAL Cube before submittion.</p>
                        <div className="btnContainerHor">
                            <Link to={'/scan'} onClick={this.closeModalBox}>
                                <button>Scan Cube</button>
                            </Link>
                            <Link to={'/virtual'} onClick={this.closeModalBox}>
                                <button>Go Virtual</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalBox;