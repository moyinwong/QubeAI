import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="navBarContent">
                    <NavLink to={'/main'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-home"></i></div>
                            <div className="descriptions">HomePage</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/scan'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-camera"></i></div>
                            <div className="descriptions">Scan Cube</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/virtual'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-cubes"></i></div>
                            <div className="descriptions">Go Virtual</div>
                        </div>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default NavBar;