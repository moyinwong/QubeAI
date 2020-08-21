import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './modalBox.css';

class ModalBox extends Component {
    render() {
        return (
            <div className="modalBox">
                <div className="modalBoxContent">
                    <div className="modalElements" id="modalPleaseScan">
                        <p className="modalDescriptions">Please scan all the sides before submittion.</p>
                    </div>
                    <div className="modalElements" id="modalScanSuccessfully">
                        <p className="modalDescriptions">You have submitted the Cube SUCCESSFULLY.  Would you like our A.I. to SOLVE it for you?</p>
                        <Link to={'/solve'}>
                            <button>Yes</button>
                        </Link>
                    </div>
                    <div className="modalElements" id="modalNotSubmitted">
                        <p className="modalDescriptions">You haven't submitted the Cube yet.  Please SCAN or try our VIRTUAL Cube before submittion.</p>
                        <div className="btnContainerHor">
                            <Link to={'/scan'}>
                                <button>Scan Cube</button>
                            </Link>
                            <Link to={'/virtual'}>
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