import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import LogoPage from './components/logoPage';
import MainPage from './components/mainPage';
import ScanPage from './components/scanPage';
import VirtualPage from './components/virtualPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='pageContainer'>
          <div className='contentContainer'>
            <Switch>
              <Route exact path='/' component={LogoPage} />
              <Route path='/main' component={MainPage} />
              <Route path='/scan' component={ScanPage} />
              <Route path='/virtual' component={VirtualPage} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
