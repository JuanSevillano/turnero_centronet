import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './containers/Home/Home'
import Turner from './containers/Turner/Turner'
import Admin from './containers/Admin/Admin'
import Option from './components/Option/Option'
import Settings from './components/Settings/Settings'

import classes from './App.module.css';

import reducer from './store/reducers/turns'

const store = createStore(reducer, applyMiddleware(thunk))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <main className={classes.App}>
          <Route exact path="/" component={Home} />
          <Route path="/turner" component={Turner} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/:type" component={Option} />
          <Route exact path="/settings" component={Settings} />
        </main >
      </Router >
    </Provider >

  );
}

export default App;
