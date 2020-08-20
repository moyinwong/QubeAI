import React, { Component } from 'react';
import { connect } from 'react-redux';
import navBarAnimation from '../functions/navBarAnimation';
import virtualModel from '../functions/virtualModel';
import { changePage } from '../actions/changePage';
import './virtualPage.css';

class VirtualPage extends Component {
    componentDidMount() {
        document.querySelector('.navBar').classList.remove('navBarHidden');
        navBarAnimation("virtual");
        this.props.changePage("virtual");
    }
    render() {
        return (
            <div className="virtualPage">
                <p>Virtual Page</p>
                <div className="canvas" id="canvas">Canvas</div>
                <button>Submit Cube</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(VirtualPage);