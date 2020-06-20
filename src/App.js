import React from 'react';
import { Provider } from 'react-redux'
<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
=======
import { createStore } from 'redux'
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './containers/Home/Home'
import Turner from './containers/Turner/Turner'
import Admin from './containers/Admin/Admin'
import Option from './components/Option/Option'
<<<<<<< HEAD
import Settings from './components/Settings/Settings'
=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

import classes from './App.module.css';

import reducer from './store/reducers/turns'

<<<<<<< HEAD
const store = createStore(reducer, applyMiddleware(thunk))
=======
const store = createStore(reducer)
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5

function App() {
  return (
    <Provider store={store}>
      <Router>
        <main className={classes.App}>
          <Route exact path="/" component={Home} />
          <Route path="/turner" component={Turner} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/:type" component={Option} />
<<<<<<< HEAD
          <Route exact path="/settings" component={Settings} />
=======
>>>>>>> 7c44cbce0d38351fda9f3ad2f5aed1781432bae5
        </main >
      </Router >
    </Provider >

  );
}

export default App;
