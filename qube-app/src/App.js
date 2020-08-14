import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import HomePage from './components/homePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
