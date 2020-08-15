import React, { Component } from 'react';
import './navBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="navBarContent">
                    <div className="elements">
                        <div className="icons"><i className="fas fa-camera"></i></div>
                        <div className="descriptions">Scan Cube</div>
                    </div>
                    <div className="elements">
                        <div className="icons"><i className="fas fa-cubes"></i></div>
                        <div className="descriptions">Go Virtual</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;