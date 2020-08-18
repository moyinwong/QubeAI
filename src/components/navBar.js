import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="navBarContent">
                    <NavLink to={'/welcome'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-home"></i></div>
                            <div className="desktopDescriptions">Welcome Page</div>
                            <div className="mobileDescriptions">Welcome</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/scan'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-camera"></i></div>
                            <div className="desktopDescriptions">Scan Cube</div>
                            <div className="mobileDescriptions">Scan</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/virtual'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-cubes"></i></div>
                            <div className="desktopDescriptions">Go Virtual</div>
                            <div className="mobileDescriptions">Virtual</div>
                        </div>
                    </NavLink>
                    <NavLink to={'/solve'}>
                        <div className="navElements">
                            <div className="icons"><i className="fas fa-calculator"></i></div>
                            <div className="desktopDescriptions">Solve Cube</div>
                            <div className="mobileDescriptions">Solve</div>
                        </div>
                    </NavLink>
                    <div className="navBorder"></div>
                </div>
            </div>
        )
    }
}

export default NavBar;