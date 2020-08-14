import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import LogoPage from './components/logoPage';
import MainPage from './components/mainPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='pageContainer'>
          <div className='contentContainer'>
            <Switch>
              <Route exact path='/' component={LogoPage} />
              <Route path='/main' component={MainPage} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
