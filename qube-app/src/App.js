import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/homePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='pageContainer'>
          <div className='contentContainer'>
            <Switch>
              <Route exact path='/' component={HomePage} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
