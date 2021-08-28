import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const HomePage = React.lazy(() => import('features/home/HomePage'));
const Counter = React.lazy(() => import('features/counter/Counter'));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<CircularProgress />}>
        <BrowserRouter>
          <Switch>
            <Route path="/counter">
              <Counter />
            </Route>
            <Route path="/" exact render={() => <HomePage />}></Route>
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
}

export default App;
