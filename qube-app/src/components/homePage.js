import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div className="HomePage">
                <header className="App-header">
                    <h1>Qube</h1>
                    <img src={require('../pic/logo-ver-bg.png')} alt="Logo" width="600" height="600" />
                </header>
            </div>
        )
    }
}

export default HomePage;