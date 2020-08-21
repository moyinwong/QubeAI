import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

// Routes
import LogoPage from './components/logoPage';
import WelcomePage from './components/welcomePage';
import TransitScanPage from './components/transitScanPage';
import TransitVirtualPage from './components/transitVirtualPage';
import ScanPage from './components/scanPage';
import VirtualPage from './components/virtualPage';
import SolvePage from './components/solvePage';

// Components
import NavBar from './components/navBar';
import ModalBox from './components/modalBox';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="pageContainer">
          <div className="contentContainer">
            <div className="wholePage">
              <Switch>
                <Route exact path='/' component={LogoPage} />
                <Route path='/welcome' component={WelcomePage} />
                <Route path='/transitScan' component={TransitScanPage} />
                <Route path='/transitVirtual' component={TransitVirtualPage} />
                <Route path='/scan' component={ScanPage} />
                <Route path='/virtual' component={VirtualPage} />
                <Route path='/solve' component={SolvePage} />
              </Switch>
              <NavBar />
              <ModalBox />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
