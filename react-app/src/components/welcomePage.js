import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import navBarAnimation from '../functions/navBarAnimation';
import { changePage } from '../actions/changePage';
import './welcomePage.css';

class WelcomePage extends Component {
    componentDidMount() {
        navBarAnimation("welcome");
        this.props.changePage("welcome");
    }
    render() {
        return (
            <div className="welcomePage">
                <p>Do you have a Rubik's Cube with you?</p>
                <div className="btnContainerVer">
                    <Link to={'/transitScan'}>
                        <button id="yesBtn">Yes</button>
                    </Link>
                    <Link to={'/transitVirtual'}>
                        <button id="noBtn">No</button>
                    </Link>
                </div>
            </div>
        )
    }
}

// Connect to Redux Store
const mapStateToProps = (state) => {
    return { currentPage: state.currentPage };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (currentPage) => {
            dispatch(changePage(currentPage));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);